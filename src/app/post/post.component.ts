import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { HttpClient } from '@angular/common/http';
import { LoginService, User } from '../services/login.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from "@auth0/angular-jwt";
import { EditDeletePostService } from '../services/edit-delete-post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SearchbarService } from '../services/searchbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input('fxFlex')
  pageNumber: number = 0;
  pageSize: number = 8;
  postsArr: Post[] = [];
  copy?: Post[];
  user: User | undefined;
  commentPagenumber: number = 0;
  pendingEditPostDescription: string = "";
  pendingEditComment: string = "";
  loggedInUser: string | undefined;
  showMoreComments: boolean = false;
  showMoreDescription: boolean = false;
  post: Post;
  isAdminUser: boolean = false;

  //for search bar
  filter = "";


  constructor(
    private searchbarService: SearchbarService,
    private postService: PostService,
    private mediaObserver: MediaObserver,
    private httpClient: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private editDeleteService: EditDeletePostService,
    private dialogMat: MatDialog
  ) {
    this.post = {} as Post;

    this.updateEditModeHelper();
    this.getLoggedInUser();
  }


  ngOnInit(): void {
    this.searchbarService.getSearchFilter().subscribe(async (value) => {
      if (this.searchbarService.filter.value.length <= 0) {
        this.filter = value;
        //use postservice
        this.getPosts();

      }
      else {
        this.filter = value;
        this.getFilteredPosts();
      }
    });
  }

  //FOR NAVIGATING TO HASHTAGS AND @S
  splitFunction(message: string): String[]{
    let messageArr = message.split(" ");

    return messageArr;
  }
  checkStartingChar(word: String): String{
    let start = word.substring(0,1);
    return start;
  }
  navigateToProfile(myString: String){
    let usernameNoAt = myString.substring(1, myString.length);
    this.router.navigate(['/' ,usernameNoAt]);
  }
  navigateToHashtag(word: String){
    let tagNoAt = word.substring(1, word.length);
    this.searchbarService.setFilter(tagNoAt);
    console.log("filtered word:", this.searchbarService.filter.value);
    this.getFilteredPosts();

  }

   //FOR POST FORMATTING

  onScroll(): void {
    if (this.filter.length == 0){
      this.pageNumber = this.pageNumber + 1;

      this.postService.getMorePosts(this.pageNumber).subscribe((res) => {
        let temp = res.content;
  
        temp.forEach((elm: any) => {
          elm.comments.numDisplayCom = 5;
  
          elm.comments.pageNumberComment = 0;
  
          elm.comments.message = "";
  
  
          elm.AddCommentOn = false;
        });
  
        this.postsArr.push(...res.content);
      });
    }
   
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  editComment(comment: Comment) {
    comment.message = this.pendingEditComment;
    this.postService.updateComments(comment);
  }

  editPost(post: Post) {
    post.message = this.pendingEditPostDescription;
    this.editDeleteService.editPost(post);
  }

  deletePost(post: Post) {
    this.editDeleteService.deletePost(post);
    this.postsArr = this.postsArr.filter(elm => elm.id !== post.id);
  }

  delete(post: Post) {
    const dialogRef = this.dialogMat.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.deletePost(post);
      }
    })
  }

  postCommentService(comment: string, id: number, post: Post) {
    if (comment.trim().length !== 0)/*Removes trail spaces from input and negates empty inputs*/ {
      ++post.comments.totalElements;

      this.postService.postComment(comment, id);

      const tokenInfo = this.getDecodedAccessToken(
        window.sessionStorage.getItem('access_token')?.toString()!
      );
      const name = tokenInfo.preferred_username;

      const nameAuthorComment = {
        id: 0,
        username: name.toString(),
        profileImageUrl: '',
      }; // Holds the username of Commentor that has been retrieved/decoded for the jwt_token(login token)

      let c = {} as Comment;
      c.author = nameAuthorComment;
      (c.createdOn = Date.now().toLocaleString()), (c.id = Math.random());
      c.message = post.comments.message;
      c.postId = id;

      post.comments.content.unshift(c);

      post.comments.message = ''; // Reset new comment
      post.AddCommentOn = !post.AddCommentOn;
    }
  }



  showComments(post: Post) {
    post.comments.pageNumberComment = 1 + post.comments.pageNumberComment;

    post.comments.numDisplayCom += 5;

    this.postService
      .getCommentsAPI(post, post.comments.pageNumberComment)
      .subscribe((data) => {
        data.content.forEach((elm: any) => {
          post.comments.content.push(elm);
        });
      });

  }

  isLoggedIn(): boolean {
    return this.loginService.getUser();

  }

  sortComments() {
    this.postsArr.forEach((elm) => {
      elm.comments.content.sort((a, b) => (a.createdOn > b.createdOn ? 1 : -1));
    });
    // this.postsArr.sort((a, b) => (a.createdOn > b.createdOn ? 1 : -1));
  }

  addLike(postid: number, post: Post) {
    post.likeCount = ++post.likeCount;

    this.postService.postlikes(postid, post);
  }

  deleteLike(postid: number, post: Post) {
    post.likeCount = --post.likeCount;

    this.postService.deleteLikes(postid);
  }

  likeDislike(post: Post) {
    if (post.hasLiked === false) {
      this.addLike(post.id, post);
    } else {
      this.deleteLike(post.id, post);
    }

    post.hasLiked = !post.hasLiked;
  }

  getPosts() {
    /////GET posts LOADS

    this.postService.getPosts().subscribe((res) => {
      this.postsArr = res.content;
      this.sortComments();

      this.user = {} as User;

      this.postsArr.forEach((elm) => {
        elm.comments.numDisplayCom = 5;
        elm.comments.message = "";

        elm.comments.pageNumberComment = 0;
      });
    });

  }

  getFilteredPosts(){
    this.searchbarService.getFilteredPosts().then((res) => {
    this.postsArr = res.content;
  })
   .catch(err=>{
     console.log(err);
   });
 }



  getLoggedInUser() {
    const token = window.sessionStorage.getItem('access_token');

    if (token === null) {
      this.loggedInUser = undefined;
      return;
    }

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);

    if (decodedToken.realm_access.roles[1] === 'admin') {
      this.isAdminUser = true;
    }
    this.loggedInUser = decodedToken.preferred_username;
  }

  updateEditModeHelper() {
    this.post = {} as Post;
    this.postService.getPosts().subscribe((res) => {
      this.postsArr = res.content;

      this.postsArr.forEach(elm => {
        elm.showMore = false;
        elm.comments.showMore = true;
        elm.comments.numDisplayCom = 5;
        elm.editMode = false;
      });
    });
  }

  toggleComment(post: Post) {
    post.AddCommentOn = !post.AddCommentOn;
  }
}

export interface Post {
  author: {
    id: number;
    username: string;
    profileImageUrl: string;
  };
  comments: {
    content: Comment[];
    totalElements: number;
    showMore: boolean;
    numDisplayCom: number;
    pageNumberComment: number;
    message: string;
  };

  imageUrl: string;
  createdOn: string;
  hasLiked: boolean;
  id: number;
  likeCount: number;
  message: string;
  showMore: boolean;
  editMode: boolean;
  AddCommentOn: boolean;
}

export interface Comment {
  author: {
    id: number;
    username: string;
    profileImageUrl: string;
  };
  createdOn: string;
  id: number;
  message: string;
  postId: number;
  editMode: boolean;
}

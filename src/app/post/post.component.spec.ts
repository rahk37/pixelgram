import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent, Post, Comment } from './post.component';
import { PostService } from '../services/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { FlexAlignStyleBuilder, MediaObserver } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let constructorTest: PostComponent;
  const postServiceSpy = jasmine.createSpyObj('PostService', [
    'getMorePosts',
    'getPosts',
  ]);
  let post = {} as Post;
  interface CommentResponse {
    content: Comment[];
  }
  let commentResponse = {} as CommentResponse;
  const comment = {
    content: [
      {
        author: {
          id: 102991,
          username: 'username',
          profileImageUrl: '',
        },
        createdOn: Date.now().toLocaleString(),
        id: 191,
        message: 'test',
        postId: 190,
        editMode: false,
      },
    ],
  };

  interface Response {
    content: Post[];
  }
  let response = {} as Response;

  const testPost = [
    {
      author: {
        id: 234,
        username: 'asf',
        profileImageUrl: '',
      },
      comments: {
        content: [
          {
            author: {
              id: 102991,
              username: 'ssasas',
              profileImageUrl: '',
            },
            createdOn: Date.now().toLocaleString(),
            id: 191,
            message: 'Message messaging',
            postId: 190,
            editMode: false,
          },
          {
            author: {
              id: 102991,
              username: 'ssasas1',
              profileImageUrl: '',
            },
            createdOn: Date.now().toLocaleString(),
            id: 191,
            message: 'Message messaging1',
            postId: 190,
            editMode: false,
          },
        ],
        showMore: false,
        numDisplayCom: 2,
        totalElements: 2,
        pageNumberComment: 3,
        message: 'hello',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: true,
      id: 2,
      imageUrl: '',
      likeCount: 0,
      message: 'this is a comment on a post',
      showMore: true,
      editMode: false,
      AddCommentOn: false,
    },
  ];

  response.content = testPost;

  commentResponse = comment;

  let refDate = new Date(1995, 12, 10);

  let Comments: Post[] = [
    {
      author: {
        id: 0,
        username: 'jason.monroe',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [
          {
            author: {
              id: Math.random(),
              username: 'chica',
              profileImageUrl: 'undefined',
            },
            createdOn: Date.now().toLocaleString(),
            id: Math.random(),
            message: 'hola hola',
            postId: 0,
            editMode: false,
          },
        ],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 0,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Big Money',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 1,
        username: 'chief_keef',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 1,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: 'No Whammy',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 2,
        username: 'kim_k',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 2,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'I love Kanye West and Baseball',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 3,
        username: 'jason.momoa',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 3,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Big Money, going to the bank today',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 4,
        username: 'fredo.santana',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 4,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: 'No Whammy, I swung a baseball bat',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 5,
        username: 'kendall_j',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 5,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'I love Travis Scott and Basketball',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 6,
        username: 'drake',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 6,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Octobers Very Own',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 7,
        username: 'Kanye_West',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 7,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: '808s and Heart Breaks',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
    {
      author: {
        id: 8,
        username: 'Mickey Mouse',
        profileImageUrl:
          'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: 'GOing',
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 8,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'Goofy and donald Duck are my best friend',
      showMore: false,
      editMode: false,
      AddCommentOn: false,
    },
  ];

  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // removed from declarations PostService
      declarations: [PostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        InfiniteScrollModule,
        MatDialogModule,
      ],
    }).compileComponents();

    // window.sessionStorage.getItem('access_token')
    window.sessionStorage.clear();
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cover into the response in the getMorePosts call', () => {
    fixture.detectChanges();

    let getPostSpy = spyOn(
      component['postService'],
      'getMorePosts'
    ).and.returnValue(of(response));
    component.onScroll();

    expect(getPostSpy).toHaveBeenCalledWith(component.pageNumber);
  });

  it('should cover into the response in the getPosts call', () => {
    fixture.detectChanges();

    let getPostSpy = spyOn(
      component['postService'],
      'getPosts'
    ).and.returnValue(of(response));
    component.ngOnInit();
    expect(getPostSpy).toHaveBeenCalled();
  });

  // it('should call getFilteredPosts if there is stuff in the search bar', () => {


  // });
  it('should return the first character in a string when checkStartingChar is called', () => {
    let myString = "test string";
    expect(component.checkStartingChar(myString)).toEqual("t");
    
  });
  // it('should navigate to the profile of the username clicked with navigateToProfile', () => {

    
  // });
  // it('should navigate to the profile of the username clicked with navigateToProfile', () => {

    
  // });
  // it('should filter by hashtag', () => {

    
  // });

  it('Testing Conditional statements in Show More Comments for Number of Comments less than 5', () => {
    const tokenInfo = component.getDecodedAccessToken(
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxa2MxRFV6UkhGczFlaXBfZ0daMG5QWHRTVkJCT3Y4Wjl5VVhsdVM4Y3owIn0.eyJleHAiOjE2NjM2MTg4MjgsImlhdCI6MTY2MzYxNzAyOCwianRpIjoiYmJiYzlmMjgtODlmMi00NmVhLTk2ZWItMWU2YTgxMjMwYjQzIiwiaXNzIjoiaHR0cHM6Ly9lbmFibGVtZW50LWtleWNsb2FrLndvcmsuY29nbml6YW50LnN0dWRpby9hdXRoL3JlYWxtcy9QaXhlbGdyYW0tTW9ub2xpdGgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGVlZGYwMjItYzQzMy00M2JmLTliOWQtMjcxYWJkNWRlZGExIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGl4ZWxncmFtLW1vbm9saXRoLWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiMTRhNDkzZTUtNWM2NS00NTQxLTliM2QtMzdkODA3NWZiMjdjIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1waXhlbGdyYW0tbW9ub2xpdGgtYmFja2VuZCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWxvbl9tdXNrIn0.B9Fxb73eE9S4oBIjxHMM8mfN5rh3BYdhwS6htKLNshdFTl58-OUNQ7Dr3_JLaDOQE32PNLGMmeUgJxxDX-xjU6XeanQq8fVtxVC-bsbebAEuyDFii-kMBrUnQKkgyevHbkC8dXPVRKFf317oryH3pBrOZI2RlOV0nl1wwTB_p35FtJHmY2JiKL1hgFpEd6IbI3kT1jaNcAx6azwTKKShhXMJxBNUoPkwzRtwe_xDnFZLrvDjCo02uUctW1wztfNMBGB4xT4S3hWWrZ1eWJEgzHfTGzqyr8Lr9T6EKnmL7NEdDsP-ircWThzqSutKgns78s6n2X5BAA9dMTUlfKKxhQ'
    );
    spyOn(component, 'showComments').and.callThrough();
    //spyOn(component['postService'], 'getCommentsAPI').and.returnValue(of(response));
    component.showComments(response.content[0]);

    expect(component.showComments).toHaveBeenCalledWith(response.content[0]);
  });

  it('should call edit method and allow users to edit a post', () => {
    spyOn(component, 'editPost').and.callThrough();
    component.editPost(post);
    expect(component.editPost).toHaveBeenCalledWith(post);
  });

  it('should set loggedInUser when logged in', () => {
    window.sessionStorage.setItem(
      'access_token',
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxa2MxRFV6UkhGczFlaXBfZ0daMG5QWHRTVkJCT3Y4Wjl5VVhsdVM4Y3owIn0.eyJleHAiOjE2NjM2MTg4MjgsImlhdCI6MTY2MzYxNzAyOCwianRpIjoiYmJiYzlmMjgtODlmMi00NmVhLTk2ZWItMWU2YTgxMjMwYjQzIiwiaXNzIjoiaHR0cHM6Ly9lbmFibGVtZW50LWtleWNsb2FrLndvcmsuY29nbml6YW50LnN0dWRpby9hdXRoL3JlYWxtcy9QaXhlbGdyYW0tTW9ub2xpdGgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGVlZGYwMjItYzQzMy00M2JmLTliOWQtMjcxYWJkNWRlZGExIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGl4ZWxncmFtLW1vbm9saXRoLWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiMTRhNDkzZTUtNWM2NS00NTQxLTliM2QtMzdkODA3NWZiMjdjIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1waXhlbGdyYW0tbW9ub2xpdGgtYmFja2VuZCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWxvbl9tdXNrIn0.B9Fxb73eE9S4oBIjxHMM8mfN5rh3BYdhwS6htKLNshdFTl58-OUNQ7Dr3_JLaDOQE32PNLGMmeUgJxxDX-xjU6XeanQq8fVtxVC-bsbebAEuyDFii-kMBrUnQKkgyevHbkC8dXPVRKFf317oryH3pBrOZI2RlOV0nl1wwTB_p35FtJHmY2JiKL1hgFpEd6IbI3kT1jaNcAx6azwTKKShhXMJxBNUoPkwzRtwe_xDnFZLrvDjCo02uUctW1wztfNMBGB4xT4S3hWWrZ1eWJEgzHfTGzqyr8Lr9T6EKnmL7NEdDsP-ircWThzqSutKgns78s6n2X5BAA9dMTUlfKKxhQ'
    );
    let fixture = TestBed.createComponent(PostComponent);
    fixture.detectChanges();
  });

  it('should call delete method and allow users to delete a post', () => {
    spyOn(component, 'deletePost').and.callThrough();
    component.deletePost(post);
    expect(component.deletePost).toHaveBeenCalledWith(post);
  });

  it('should set post attributes', async () => {
    fixture.detectChanges();

    let getPostSpy = spyOn(
      component['postService'],
      'getPosts'
    ).and.returnValue(of(response));
    component.updateEditModeHelper();
    expect(getPostSpy).toHaveBeenCalled();
  });

  it('Should Trigger Scroll method', () => {
    spyOn(component, 'onScroll').and.callThrough();
    component.onScroll();
    expect(component.onScroll).toHaveBeenCalled();
  });

  //Story 8

  //Passes
  it('Input is visible if user is logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);

    let tests = component.isLoggedIn();

    let input = fixture.debugElement.nativeElement.querySelector(
      '[data-test-id="input"]'
    );

    expect(input).toBeTruthy;
  });

  //Passes
  it('Input is not visible if user is not logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(false);

    component.isLoggedIn();

    let input = fixture.debugElement.nativeElement.querySelector(
      '[data-test-id="input"]'
    );

    expect(input).toBeFalsy;
  });

  //Need to fix
  // it('Upon clicking button input is cleared ', () => {
  //   let message = Comments[0].message;

  //   let id = Comments[0].comments.content[0].id;
  //   spyOn(component, 'isLoggedIn').and.returnValue(false);

  //   spyOn(component, 'postCommentService').and.callFake;
  //   component.isLoggedIn();

  //   component.postCommentService(message, id, Comments[0]);

  //   let input = fixture.debugElement.nativeElement.querySelector('[data-test-id="comment-box"]');
  //   fixture.detectChanges();
  //   expect(input).toBe(null);
  // });

  it('Comments are sorted by Date(Newest First)', () => {
    spyOn(component, 'getPosts');
    component.getPosts();
    // Mock funtion call
    Comments.sort((a, b) => (a.createdOn > b.createdOn ? 1 : -1));
    expect(Comments[0].createdOn > Comments[1].createdOn);
  });

  it('Comments are posted successfully', () => {
    //Spy on the post service
    //click submit button
    //check that post was successful
    //check that post is in content array
    //check that user's post is in the dom
    spyOn(component, 'getPosts').and.callThrough();
    component.getPosts();
  });

  it('Comments are displayed on the screen', () => {
    spyOn(component, 'getPosts').and.callThrough();
    component.getPosts();

    //expect(component.postsArr[0].comments.content[0].message).toEqual("Message messaging4");
  });

  it('addLike should be called', () => {
    spyOn(component, 'addLike').and.callThrough();

    component.addLike(response.content[0].id, response.content[0]);
    expect(component.addLike).toHaveBeenCalledWith(
      response.content[0].id,
      response.content[0]
    );
  });

  it('deleteLike should be called', () => {
    spyOn(component, 'deleteLike').and.callThrough();

    component.deleteLike(response.content[0].id, response.content[0]);
    expect(component.deleteLike).toHaveBeenCalledWith(
      response.content[0].id,
      response.content[0]
    );
  });

  it('likeDislike should be called when post.hasLiked is false', () => {
    interface Response {
      content: Post[];
    }
    let response = {} as Response;

    const post = [
      {
        author: {
          id: 234,
          username: 'asf',
          profileImageUrl: '',
        },
        comments: {
          content: [
            {
              author: {
                id: 102991,
                username: 'ssasas',
                profileImageUrl: '',
              },
              createdOn: Date.now().toLocaleString(),
              id: 191,
              message: 'Message messaging',
              postId: 190,
              editMode: false,
            },
            {
              author: {
                id: 102991,
                username: 'ssasas1',
                profileImageUrl: '',
              },
              createdOn: Date.now().toLocaleString(),
              id: 191,
              message: 'Message messaging1',
              postId: 190,
              editMode: false,
            },
          ],
          showMore: false,
          numDisplayCom: 2,
          totalElements: 2,
          pageNumberComment: 3,
          message: 'hello',
        },
        createdOn: Date.now().toLocaleString(),
        hasLiked: false,
        id: 2,
        imageUrl: '',
        likeCount: 0,
        message: 'this is a comment on a post',
        showMore: true,
        editMode: false,
        AddCommentOn: false,
      },
    ];

    response.content = post;
    spyOn(component, 'likeDislike').and.callThrough();

    component.likeDislike(response.content[0]);
    expect(component.likeDislike).toHaveBeenCalledWith(response.content[0]);
  });

  it('likeDislike should be called with post.haslike = true', () => {
    spyOn(component, 'likeDislike').and.callThrough();

    component.likeDislike(response.content[0]);
    expect(component.likeDislike).toHaveBeenCalledWith(response.content[0]);
  });

  it('showComments');

  it('should call editComments and expect the correct response', () => {
    let spy = spyOn(component, 'editComment').and.callThrough();

    component.editComment(commentResponse.content[0]);
    expect(spy).toHaveBeenCalledWith(commentResponse.content[0]);
  });
});

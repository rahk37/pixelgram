import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { PostService } from './post.service';
import { PostComponent, Post, Comment } from '../post/post.component';
describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpClientTestingModule;
  let tests: HttpTestingController;
  // let baseUrl : string ='http://localhost:8080/posts';
  let baseUrl: String = 'https://pixelgram-backend.work.cognizant.studio/posts';
  //let baseUrl: String = 'http://34.134.148.105/posts';

  let pageNumber = 1;
  let username = "ruthful";

  interface CommentResponse {
    content: Comment[];
  }
  let commentResponse = {} as CommentResponse;
  const comment = {
    content: [
      {
        createdOn: '',
        id: 0,
        postId: 0,
        author: {
          id: 0,
          username: 'string',
          profileImageUrl: 'string',
        },
        message: 'test',
        editMode: false,
      },
    ],
  };

  commentResponse = comment;

  let fakePosts: Post[] = [
    {
      author: {
        id: 0,
        username: 'jason.monroe',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [
          {
            author: {
              id: Math.random(),
              username: "chica",
              profileImageUrl: "undefined",
            },
            createdOn: Date.now().toLocaleString(),
            id: Math.random(),
            message: "hola hola",
            postId: 0,
            editMode: false,
          }
        ],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 0,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Big Money',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 1,
        username: 'chief_keef',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 1,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: 'No Whammy',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 2,
        username: 'kim_k',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 2,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'I love Kanye West and Baseball',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 3,
        username: 'jason.momoa',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 3,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Big Money, going to the bank today',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 4,
        username: 'fredo.santana',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 4,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: 'No Whammy, I swung a baseball bat',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 5,
        username: 'kendall_j',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 5,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'I love Travis Scott and Basketball',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    }, {
      author: {
        id: 6,
        username: 'drake',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 6,
      imageUrl: '../assets/too_wide.png',
      likeCount: 14,
      message: 'Octobers Very Own',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 7,
        username: 'Kanye_West',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 7,
      imageUrl: '../assets/too_tall.png',
      likeCount: 14,
      message: '808s and Heart Breaks',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
    {
      author: {
        id: 8,
        username: 'Mickey Mouse',
        profileImageUrl: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
      },
      comments: {
        content: [],
        totalElements: 0,
        showMore: false,
        numDisplayCom: 0,
        pageNumberComment: 0,
        message: "GOing",
      },
      createdOn: Date.now().toLocaleString(),
      hasLiked: false,
      id: 8,
      imageUrl: '../assets/too_big.png',
      likeCount: 14,
      message: 'Goofy and donald Duck are my best friend',
      showMore: false,
      editMode: false,
      AddCommentOn: false
    },
  ];
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);

  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(PostService);
      httpMock =TestBed.inject(HttpClientTestingModule);
      tests = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get the first 5 posts for the Post component', () => {
    let firstFivePost = fakePosts.slice(0, 5);
    httpClientSpy.get.and.returnValue(of(firstFivePost));
    //Act
    service.getPosts().subscribe(
      //Assert
      res => expect(res).toEqual(firstFivePost)
    );

    //Assert
    const postHeadersAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };


    
    // const httpR = tests.expectOne(baseUrl + '?pageNumber=0&pageSize=5');
   
   //expect(httpR).toBeTruthy();
   
    expect(httpClientSpy.get).toHaveBeenCalledWith(baseUrl + '?pageNumber=0&pageSize=5',  jasmine.any(Object));
   // expect(httpClientSpy.get).toHaveSpyInteractions
     expect(httpClientSpy.get).toHaveBeenCalled();

  });


  it('get the next 5 posts for the Post component', () => {
    let NextPosts = fakePosts.slice(5, 9);
    httpClientSpy.get.and.returnValue(of(NextPosts));
    //Act
    service.getMorePosts(pageNumber).subscribe(
      //Assert
    res => expect(res).toEqual(NextPosts)
    );

    //Assert
    expect(httpClientSpy.get).toHaveBeenCalledWith(baseUrl + '?pageNumber=' + pageNumber + '&pageSize=5',jasmine.any(Object));
    expect(httpClientSpy.get).toHaveBeenCalled();
    // expect(httpClientSpy.get).toHaveBeenCalledWith(baseUrl + '?pageNumber=' + 1 + '&pageSize=5')


  });


  it('get user posts', () => {
    let firstFivePost = fakePosts.slice(0, 5);
    httpClientSpy.get.and.returnValue(of(firstFivePost));
    //Act
    service.getUserPosts(username).subscribe(
      //Assert
      res => expect(res).toEqual(firstFivePost)
    );

    //Assert
    const postHeadersAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    expect(httpClientSpy.get).toHaveBeenCalledWith(baseUrl + '/' + username + '?pageNumber=0&pageSize=50',  jasmine.any(Object));
   // expect(httpClientSpy.get).toHaveSpyInteractions
     expect(httpClientSpy.get).toHaveBeenCalled();

  });


  it('should call updateComments', ()=>{
    // let url = baseUrl + '/0/comments/';
    //Assert
    let url = baseUrl + '/0/comments/0';
    httpClientSpy.put.and.returnValue(of(comment.content[0]));

    service.updateComments(comment.content[0]).then(
      res => expect(res).toEqual(comment.content[0])
    );

    expect(httpClientSpy.put).toHaveBeenCalledWith(
      url,
      comment.content[0],
      jasmine.any(Object)
    );
  });

  it('should call postComment', ()=>{
    let url = baseUrl + '/0/comments';
    //Assert
    httpClientSpy.post.and.returnValue(of(comment.content[0]));

    service.postComment(comment.content[0].message, comment.content[0].id).then(
      res => expect(res).toEqual(comment.content[0])
    );

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      url,
      comment.content[0],
      jasmine.any(Object)
    );
  });

  it('errors should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });

  it('0 error should be caught and handled ', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 0 error',
      status: 0,
      statusText: 'Not Found',
    });

    spyOn(service, 'handleError').and.callThrough();
    service.handleError(errorResponse);
    expect(service.handleError).toHaveBeenCalled();
    done();
  });

});

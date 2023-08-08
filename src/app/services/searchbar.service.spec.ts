import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchbarService } from './searchbar.service';
import { PostComponent, Post, Comment } from '../post/post.component';
import { of } from 'rxjs';

describe('SearchbarService', () => {
  let service: SearchbarService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

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
    }];

    
  beforeEach( async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],

    })
    service = TestBed.inject(SearchbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set filter on user input', () => {
    service.setFilter("value");
    expect(service.filter.value).toEqual("value");
  });

  it('should get all the filtered posts', () => {
    httpClientSpy.get.and.returnValue(of(fakePosts));

    service.getFilteredPosts().then(
      res => expect(res).toEqual(fakePosts)
    );
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should call handle error in the search service',  (done: DoneFn) => {
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

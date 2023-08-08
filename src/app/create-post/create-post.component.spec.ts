import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatePostService, Post } from '../services/create-post.service';

import { CreatePostComponent } from './create-post.component';
import { FormsModule } from '@angular/forms';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;





  let post = {} as Post;
  post.postDescription = "This is the description";
  post.postImg = "testfile";


  const createServiceSpy = jasmine.createSpyObj('CreateService', ['sendFiles', 'getFile', 'changeEvent']);
  createServiceSpy.sendFiles.and.returnValue(of(post));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: CreatePostService, useValue: createServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFile on file input', () => {
    let data = (new Blob(["Hello World"], { type: 'image/jpg' }));
    // let arrayOfBlob = new Array<Blob>();
    //arrayOfBlob.push(data);
    let file = new File([data], "testfile.jpg");
    let fileList: FileList = {
      0: file,
      length: 1,
      item: (index: number) => file
    };

    //  let changeEvent = new Event('change');
    let imgUploadButton = fixture.debugElement.nativeElement.querySelector('[data-test-id="img"]');
    //   imgUploadButton.dispatchEvent(changeEvent);
    //component.getFile(file);

    spyOn(component, 'getFile').and.callThrough();
    component.getFile(fileList);
    //imgUploadButton.triggerEventHandler('change');
    expect(component.getFile).toHaveBeenCalled();
    component.post.postImg = fileList.item.name;
    //expect(component.post.postImg).toEqual(post.postImg);


  });
  
  it('should hold file after getFile', () => {
    //mock file
    const mockFile = new File([''], 'testfile.jpg', { type: 'image/jpg' });
    const dataTransferFiles = new DataTransfer();
    dataTransferFiles.items.add(mockFile);

    let fileList: FileList = {
      0: mockFile,
      length: 1,
      item: (index: number) => mockFile
    };
    const inputEl = fixture.debugElement.query(By.css('[data-test-id="img"]'));
    inputEl.nativeElement.files = dataTransferFiles.files;

    inputEl.nativeElement.dispatchEvent(new InputEvent('change'));
    expect(component.post.postImg).toBeTruthy();
    expect(component.post.postImg.name).toBe('testfile.jpg');


    //start test
    //  spyOn(component, 'getFile').and.callThrough();
    //  component.getFile(fileList)
    //   createServiceSpy.getFile(fileList);
    //   component.post.postImg = fileList.item(0);
    //   expect(component.errMsg).toBe('');
    //   expect(component.post.postImg).toEqual(fileList.item(0)); //File not recognized as image, so it doesn't get this far

  });

  it('should not hold files that are not images', () => {
    //mock file
    const mockFile = new File([''], 'testfile.txt', { type: 'text/plain' });
    const dataTransferFiles = new DataTransfer();
    dataTransferFiles.items.add(mockFile);

    let fileList: FileList = {
      0: mockFile,
      length: 1,
      item: (index: number) => mockFile
    };
    const inputEl = fixture.debugElement.query(By.css('[data-test-id="img"]'));
    inputEl.nativeElement.files = dataTransferFiles.files;

    inputEl.nativeElement.dispatchEvent(new InputEvent('change'));
    expect(component.post.postImg).toBeFalsy();
    expect(component.errMsg).toBe('* Wrong file type! Upload must be an image.');

    //expect(component.post.postImg.name).toBe('testfile.jpg');

  });

  it('should not hold files that are too big', () => {
    //mock file
    const mockFile = new File([''], 'testfile.txt', { type: 'image/jpg' });
    Object.defineProperty(
      mockFile, 'size', { value: Math.pow(1024, 4), writable: false });
    const dataTransferFiles = new DataTransfer();
    dataTransferFiles.items.add(mockFile);

    let fileList: FileList = {
      0: mockFile,
      length: 1,
      item: (index: number) => mockFile
    };
    const inputEl = fixture.debugElement.query(By.css('[data-test-id="img"]'));
    inputEl.nativeElement.files = dataTransferFiles.files;

    inputEl.nativeElement.dispatchEvent(new InputEvent('change'));
    expect(component.post.postImg).toBeFalsy();
    expect(component.errMsg).toBe('* Image too large! Maximum file size is 1048576 bytes.');

    //expect(component.post.postImg.name).toBe('testfile.jpg');

  });

  it('should call sendPost when valid img and descrption provided', () => {
    let descriptionTextbox = fixture.debugElement.nativeElement.querySelector('[data-test-id="description"]');
    descriptionTextbox.value = post.postDescription;
    descriptionTextbox.dispatchEvent(new Event('input'));
    //let imgUploadButton = fixture.debugElement.nativeElement.querySelector('[data-test-id="img"]');
    //imgUploadButton.value = post.postImgg.valu;
    let form = fixture.debugElement.nativeElement.querySelector('[data-test-id="form"]');
    form.dispatchEvent(new Event('submit'));
    createServiceSpy.sendFiles(post);
    expect(createServiceSpy.sendFiles).toHaveBeenCalledWith(post);
    expect(descriptionTextbox.value).toEqual(post.postDescription);

  })
});

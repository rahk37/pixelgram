import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePostService, Post } from '../services/create-post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post;
  errMsg: string = "* Image is required";
  loading: boolean = false;

  constructor(private createService: CreatePostService, private router: Router) {
    this.post = {} as Post;
  }

  getFile(event: FileList): void {
    //for getting the file when it's uploaded, but before we submit the post

    const file = event.item(0);

    if (file?.type.split('/')[0] !== 'image') {
      this.errMsg = "* Wrong file type! Upload must be an image.";
      console.log(this.errMsg);
      return;
    }
    if (file?.size > 1048576) {
      this.errMsg = "* Image too large! Maximum file size is 1048576 bytes.";
      console.log(this.errMsg);
      
      return;
    }

    this.post.postImg = file;
  }

  sendPost() {
    this.loading = true;
    this.createService.sendFiles(this.post).then((res) => {
      this.loading = false;
      this.router.navigate(['/post']);
    })
      .catch(err => {})
  }
  
  
  ngOnInit(): void {
  }

}

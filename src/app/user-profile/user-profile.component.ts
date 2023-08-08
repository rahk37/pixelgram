import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../post/post.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: string | null;
  profilePic: string | null = null;
  validUser: boolean;
  postsArr: Post[] = [];
  gutter: string;
  minimize: boolean = false;
  svgHeight: number;

  constructor(private route: ActivatedRoute, private router: Router, 
    private loginService: LoginService, private postService: PostService) {
    this.user = this.route.snapshot.paramMap.get("userName");
    this.validUser = this.user !== null;
    console.log("this.user", this.user);
    this.gutter = "3%";
    this.svgHeight = 12;
  }

  ngOnInit(): void {
    console.log(this.validUser);
    if (!this.validUser){
      this.router.navigate(['/', '404']);
    }
    this.getUserPosts();
  }

  getUserPosts() {
    if(this.validUser) {
      this.postService.getUserPosts(this.user!).subscribe((res) => {
        this.postsArr = res.content;
        this.profilePic = res.content[0].author.profileImageUrl;
      })
    }
  }

  onResize(event: UIEvent) {
    let myEvent: any = event; 
    this.gutter = (myEvent.target.innerWidth <= 735) ? "0.5%" : "3%";
    this.minimize = myEvent.target.innerWidth <= 735;
    this.svgHeight = (myEvent.target.innerWidth <= 735) ? 24 : 12;
  }

}




  



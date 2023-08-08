import { NgModule } from '@angular/core';
import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './route-guards/auth.guard';

import { PostComponent } from './post/post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



const routes: Routes = [
  {path: '', redirectTo: 'post', pathMatch: 'full',},
  {path: 'post', component: PostComponent},
  {path: 'register', component:RegistrationComponent},
  {path: 'login', component: LoginComponent},
  { path: 'create-post', component: CreatePostComponent, canActivate:[AuthGuard]},
  {path: ':userName', component: UserProfileComponent},
  
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

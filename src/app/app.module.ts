import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PostComponent } from './post/post.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogComponent } from './post/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmLogoutComponent } from './navbar/dialog-confirm-logout/dialog-confirm-logout.component';
import { SearchbarComponent } from './navbar/searchbar/searchbar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    PostComponent,
    LoginComponent,
    NavbarComponent,
    CreatePostComponent,
    UserProfileComponent,
    NavbarComponent,
    DialogComponent,
    DialogConfirmLogoutComponent,
    SearchbarComponent,
    PagenotfoundComponent,
  ],
  imports: [
    MatCardModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    FlexLayoutModule,
    MatListModule,
    InfiniteScrollModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule 
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

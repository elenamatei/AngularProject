import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {PostFeedComponent} from "./pages/post-feed/post-feed.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";

const routes: Routes = [
  {path:'',redirectTo:"/home",pathMatch:"full"},
  {path:'home', component:HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'postFeed',component: PostFeedComponent},
  {path:'profilePage', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

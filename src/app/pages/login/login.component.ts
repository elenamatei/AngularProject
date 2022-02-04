import { Component, OnInit } from '@angular/core';
import {LoginDTO} from "../../interfaces/login-dto";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isDisabled:boolean=true;
  public user:LoginDTO = {
    email:"",
    password:""
  }
  public error: boolean | string = false;
  state = AuthenticatorCompState.ELSE;
  firebasetsAuth: FirebaseTSAuth;
  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();

  }

  ngOnInit(): void {
  }

  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  isNotValid():boolean{
    return !this.user.email || !this.user.password;
  }
  onLogin(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement,

  ){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(this.isNotEmpty(email) &&
      this.isNotEmpty(password)
    ){
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password:password,
          onComplete: (uc) =>{
            console.log("You've been logged in!");
            loginEmail.value = "";
            loginPassword.value ="";
          },
          onFail:(err) =>{
            alert("Login failed.");
          }
        }
      );
    }

  }

  onResetClick(resetEmail: HTMLInputElement){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email:email,
          onComplete:(err)=>{
            alert("Reset email was sent!");
          }
        }
      );
    }
  }
  isNotEmpty(text:string){
    return text != null && text.length > 0;
  }

  // validateEmail(email: string) {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }


}
export enum AuthenticatorCompState{
  ELSE,
  FORGOT_PASSWORD
}

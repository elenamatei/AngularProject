import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public myForm!:FormGroup;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private router:Router, private formBuilder:FormBuilder) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

    });

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegisterClick(
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConfirmPassword:HTMLInputElement,

  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

if(this.isNotEmpty(email) &&
  this.isNotEmpty(password) &&
  this.isNotEmpty(confirmPassword) &&
  this.isMatching(password, confirmPassword)

){
  this.firebasetsAuth.createAccountWith(
    {
      email: email,
      password:password,

      onComplete: (uc) =>{
        console.log("Account Created!");
        registerEmail.value = "";
        registerPassword.value = "";
        registerConfirmPassword.value = "";
      },
      onFail:(err) =>{
        alert("Failed to create the account.");
      }
    }
  );
}

  }

  isMatching(text: string, comparedWith: string){
    return text == comparedWith;
}

isNotEmpty(text: string){
    return text!=null && text.length >0;
}
  doRegister(): void {
    console.log(this.myForm);

  }

}

import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProject';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  private static userDocument: UserDocument;

  constructor(private router: Router ){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {

              this.getUserProfile();
             // alert("Logged In");

            },
            whenSignedOut: user => {
              // @ts-ignore
              AppComponent.userDocument = null;
            },
            whenChanged: user => {

            }

          }
        );
      }
    );
  }

  getUserProfile(){
    // @ts-ignore
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        // @ts-ignore
        path: ["Users", this.auth.getAuth().currentUser.uid],
        onUpdate: (result) =>{
          AppComponent.userDocument = <UserDocument>result.data();
            this.userHasProfile = result.exists;
            // @ts-ignore
          AppComponent.userDocument.userId = this.auth.getAuth().currentUser.uid;
            if(this.userHasProfile){
              this.router.navigate(['/postFeed']).then(r => {});
            }

        }
      }
    );
  }

  public static getUserDocument(){
    return AppComponent.userDocument;
  }
  // @ts-ignore
  getUsername(){
    try {
      return AppComponent.userDocument.publicName;
    } catch (err) {

    }
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }
  onLogoutClick(){
    this.auth.signOut();
    this.router.navigate(['/home']);
  }


}

export interface UserDocument{
  publicName: string;
  description: string;
  userId: string;
}

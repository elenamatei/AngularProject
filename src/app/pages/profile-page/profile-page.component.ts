import {Component, Input, OnInit} from '@angular/core';
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
auth = new FirebaseTSAuth();
firestore = new FirebaseTSFirestore();
personName : string;
personDescription : string;
  constructor() { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){

    this.firestore.getDocument(
      {
        // @ts-ignore
        path: ["Users", this.auth.getAuth().currentUser.uid],
        onComplete: result => {
          let userDocument = result.data();
          // @ts-ignore
          this.personName = userDocument.publicName;
          // @ts-ignore
          this.personDescription = userDocument.description;

        }
      }
    );

  }

}

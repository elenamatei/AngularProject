import {Component, Input, OnInit} from '@angular/core';
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {CreatePostComponent} from "../../components/create-post/create-post.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() show: boolean | undefined;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor() {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement
  ){
    let name = nameInput.value;
    let description = descriptionInput.value;


    this.firestore.create(
      {// @ts-ignore
        path: ["Users", this.auth.getAuth().currentUser.uid],
        data: {
          publicName: name,
          description: description

        },
        onComplete: (docId ) => {
          //alert("ProfileCreated");
          nameInput.value = "";
          descriptionInput.value = "";

        },
        onFail: (err) =>{

        }
      }
    )
  }

}

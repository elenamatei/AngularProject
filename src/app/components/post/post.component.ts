import {Component, Input, OnInit} from '@angular/core';
import {PostData} from "../../pages/post-feed/post-feed.component";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {MatDialog} from "@angular/material/dialog";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {ReplyComponent} from "../reply/reply.component";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData: PostData;
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();
  creatorName : string;
  creatorDescription : string;
  constructor(private dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.getCreatorInfo();
  }
  onHeartClick(){
    this.postData.liked = !this.postData.liked;
    this.firestore.update(
      {// @ts-ignore
        path: ["Posts", this.postData.postId],
        data: {
          liked: this.postData.liked

        },
        onComplete: (docId ) => {

        },
        onFail: (err) =>{

        }
      }
    );
  }





  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          let userDocument = result.data();
          // @ts-ignore
          this.creatorName = userDocument.publicName;
          // @ts-ignore
          this.creatorDescription = userDocument.description;

        }

      }
    );

  }

  onReplyClick(){
    this.dialog.open(ReplyComponent,{data: this.postData.postId});
  }


}

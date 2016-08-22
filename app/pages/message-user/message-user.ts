import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {Post} from "../calendar-detail/calendar-detail"


interface MessageContent{
  post:Post;
  message:String;
}

/*
  Generated class for the MessageUserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/message-user/message-user.html',
})
export class MessageUserPage {

  private post:Post;
  private messageData:MessageContent;
  constructor(private nav:NavController,private navParams:NavParams) {
    this.post = navParams.data;
    this.messageData = {post: this.post,message:""}

  }

}

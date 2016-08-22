import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {Post} from "../calendar-detail/calendar-detail"
import {Day} from "../calendar/calendar"


interface OfferMessage{
  post:Post;
  message:String;
  swapType:string;
}


/*
  Generated class for the OfferPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/offer-post/offer-post.html',
})
export class OfferPostPage {

  private post:Post;
  private day:Day;
  private messageData:OfferMessage;
  constructor(private nav:NavController,private navParams:NavParams) {
    this.post = navParams.data.post;
    this.day = navParams.data.day;
    this.messageData = {post: this.post,message:"",swapType: "trade"}

  }


}

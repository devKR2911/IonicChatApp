import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ChatScreenPage } from '../chat-screen/chat-screen';

import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-info',
  templateUrl: 'chat-info.html',
})
export class ChatInfoPage {

  chatInfo : FormGroup;
  username: string = '';
  clientname: string = '';
  chatForm: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private socket: Socket) {
    this.chatInfo = this.formBuilder.group({
      username: ['', Validators.required],
      clientname: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatInfoPage');
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.chatInfo.controls.username.value);
    this.navCtrl.push(ChatScreenPage, { username: this.chatInfo.controls.username.value, 
                                        clientname: this.chatInfo.controls.clientname.value });
  }

}

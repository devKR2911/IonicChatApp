import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatInfoPage } from '../chat-info/chat-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToChat() {
    this.navCtrl.push(ChatInfoPage);
  }

}

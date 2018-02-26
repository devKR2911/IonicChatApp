import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ChatScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-screen',
  templateUrl: 'chat-screen.html',
})
export class ChatScreenPage {

  @ViewChild(Content) content: Content;

  messages = [];
  username = '';
  clientname = '';
  message = '';
 
  constructor(private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.username = this.navParams.get('username');
    this.clientname = this.navParams.get('clientname');
 
    this.getMessages().subscribe(message => {
      this.messages.push(message);
      //Scrolling the page to bottom while the chat has arrived
      setTimeout(() => {
          this.content.scrollToBottom(300);
      }, 10);
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }
 
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}

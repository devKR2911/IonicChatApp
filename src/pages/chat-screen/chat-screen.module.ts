import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatScreenPage } from './chat-screen';

@NgModule({
  declarations: [
    ChatScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatScreenPage),
  ],
  exports: [
    ChatScreenPage
  ],
  entryComponents: [
    ChatScreenPage
  ]
})
export class ChatScreenPageModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatWrapperComponent } from './chat-wrapper/chat-wrapper.component';
import { ChatInputBarComponent } from './chat-input-bar/chat-input-bar.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { UserMenuWrapperComponent } from './user-menu-wrapper/user-menu-wrapper.component';
import { UserMenuInfoComponent } from './user-menu-info/user-menu-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatWrapperComponent,
    ChatInputBarComponent,
    ChatHistoryComponent,
    UserMenuWrapperComponent,
    UserMenuInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

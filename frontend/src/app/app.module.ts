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
import { AuthorizeFormComponent } from './authorize-form/authorize-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatWrapperComponent,
    ChatInputBarComponent,
    ChatHistoryComponent,
    UserMenuWrapperComponent,
    UserMenuInfoComponent,
    AuthorizeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}

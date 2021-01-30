import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'

const config = {
  apiKey: "AIzaSyBUTfG-EOLImQi6_MvvF2I1GBczMui_w24",
  authDomain: "gatormeet-17f79.firebaseapp.com",
  projectId: "gatormeet-17f79",
  storageBucket: "gatormeet-17f79.appspot.com",
  messagingSenderId: "993578277870",
  appId: "1:993578277870:web:c446c76c431ebe2a684cff",
  measurementId: "G-8QRWFDW1EY"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



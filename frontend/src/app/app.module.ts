import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LandingComponent } from './landing/landing.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ResultsComponent } from './results/results.component';
import { PollingComponent } from './polling/polling.component';

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
    AppComponent,
    LandingComponent,
    CreatePollComponent,
    ResultsComponent,
    PollingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



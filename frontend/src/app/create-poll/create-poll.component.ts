import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { HexBase64BinaryEncoding } from 'crypto';
import { randomBytes } from 'crypto';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})

export class CreatePollComponent implements OnInit {
  createPollForm: FormGroup;
  loading: boolean;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.createPollForm = this.formBuilder.group({
      email: ['', Validators.required],
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required]

  });

  }

  get f() { return this.createPollForm.controls; }


  // create poll 
  goToPolling(): void {
    // this.submitted = true;
    // this.loading = true;
    // const poll = this.createPollForm.value
    // const ID = this.generateUniqueToken();
    // console.log(poll)

    // user data gets added 
    // person creating the poll
    
    this.router.navigate(['/polling']);
  }

// randomString(length: number, chars: string): string {
//     var result = '';
//     for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     return result;
// }


  
// generateUniqueToken(): string
// {
//   // https://firebase.google.com/docs/firestore/query-data/queries
//   // ^^ guide to simple queries in js for google firestore
 
//   let token = this.randomString(32, '0123456789');
//   let meetingsRef = this.db.collection('Meetings', ref => ref.where("UniqueToken", "==", token)).get();
//   while(meetingsRef != null)
//   {
//     token = this.randomString(32, '0123456789');
//     meetingsRef = this.db.collection('Meetings', ref => ref.where("UniqueToken", "==", token)).get();
//   }
//   return token;
// }

}
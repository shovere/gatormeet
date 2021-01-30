import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
  createPollForm: FormGroup;
  loading: boolean;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createPollForm = this.formBuilder.group({
      email: ['', Validators.required],
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required]

  });

  }

  get f() { return this.createPollForm.controls; }


  goToPolling(): void {
    this.submitted = true;
    this.loading = true;
    console.log(this.createPollForm.value)
    this.router.navigate(['/polling']);
   
  }
}

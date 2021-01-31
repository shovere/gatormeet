import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss']
})
export class PollingComponent implements OnInit {

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



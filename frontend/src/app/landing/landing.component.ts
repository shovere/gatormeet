import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  findEvent: any;
  loading: boolean;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    
   }

  ngOnInit(): void {
    this.findEvent = this.formBuilder.group({
      uniqueID: ['', Validators.required]
      });
  }

  goToCreate(): void {
    this.router.navigate(['/create-poll']);

  }

  goToPolling(): void{
    this.submitted = true;
    this.loading = true;
    console.log(this.findEvent.value.uniqueID)
    this.router.navigate(['/polling']);

  }

}

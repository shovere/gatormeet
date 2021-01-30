import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCreate(): void {
    this.router.navigate(['/create-poll']);

  }

  goToResults(): void{
    this.router.navigate(['/results']);

  }

}

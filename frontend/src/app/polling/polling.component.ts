import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss']
})
export class PollingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToResults(): void{
    this.router.navigate(['/results']);

  }
}

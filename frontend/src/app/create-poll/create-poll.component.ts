import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPolling(): void {
    this.router.navigate(['/polling']);
  }
}

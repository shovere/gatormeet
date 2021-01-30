import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gatormeet';



  constructor(
    private db: AngularFirestore
  ) {
    const things = db.collection('things').valueChanges()

    things.subscribe(data => {
      console.log(data);
    })
  }


  onClick() {
    this.db.collection('Counter').add({ count: 1 })
  }
}

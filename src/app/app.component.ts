import { Component, OnInit } from '@angular/core';
import { ModelView } from './model/model-view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private mvl: ModelView) {
    this.mvl.setCartItems();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.mvl.token = localStorage.getItem('token');
      this.mvl.userData.next(JSON.parse(localStorage.getItem('user')));
      this.mvl.setCartItems();
    }
  }
}

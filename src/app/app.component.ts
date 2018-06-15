import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'https://api.github.com/search/users?q=';
  data: any = {};
  searchString: string;
  constructor(private http: Http) {
    // this.getContacts();
    // this.getData();
  }

  getData(url) {
    return this.http.get(url)
    .map((res: Response) => res.json() );
  }
  getContacts(searchStr) {
    const url = this.apiUrl + searchStr;
    this.getData(url).subscribe(data => {
      this.data = data;
      console.log('data', this.data);
    },
  error => {
    console.log('error', error);
  });

  }
  onKeyUp(event) {
    if (event.target.value !== '') {
      console.log(event.target.value);
    this.getContacts(event.target.value);
    } else {
      this.data.total_count = null;
      this.data.items = [];
    }

  }
  myFunction(type) {
    if (type === 'nameDesc') {
    this.data.items.sort(function(a, b) {
        const x = a.login.toLowerCase();
        const y = b.login.toLowerCase();
        if (x > y) {return -1; }
        if (x < y) {return 1; }
        return 0;
    });
    }
    if (type === 'nameAsc') {
      this.data.items.sort(function(a, b) {
          const x = a.login.toLowerCase();
          const y = b.login.toLowerCase();
          if (x < y) {return -1; }
          if (x > y) {return 1; }
          return 0;
      });
      }
      if (type === 'rankAsc') {
        this.data.items.sort(function(a, b) {return a.score - b.score; });
        }
        if (type === 'rankDesc') {
          this.data.items.sort(function(a, b) {return b.score - a.score; });
          }

}
}

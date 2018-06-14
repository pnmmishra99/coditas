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
    });

  }
  onKeyUp(event) {
    console.log(event.target.value);
    this.getContacts(event.target.value);
  }
}

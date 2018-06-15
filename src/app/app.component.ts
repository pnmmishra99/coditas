import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {PagerService} from './pager.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'https://api.github.com/search/users?q=';
  // buttonCondition = false;
  repoData: any = [];
  selectedDetails: number;
  totalCount: number;
  data: any = {};
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  searchString: string;
  constructor(private http: Http, private pagerService: PagerService) {
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
      // this.data = data;
      // set items to json response
      this.totalCount = data.total_count;
      this.allItems = data.items;

      // initialize to page 1
      this.setPage(1);
    },
  error => {
    console.log('error', error);
  });

  }
  onKeyUp(event) {
    if (event.target.value !== '') {
    this.getContacts(event.target.value);
    } else {
      this.data.total_count = null;
      this.data.items = [];
    }

  }
  myFunction(type) {
    if (type === 'nameDesc') {
    this.pagedItems.sort(function(a, b) {
        const x = a.login.toLowerCase();
        const y = b.login.toLowerCase();
        if (x > y) {return -1; }
        if (x < y) {return 1; }
        return 0;
    });
    }
    if (type === 'nameAsc') {
      this.pagedItems.sort(function(a, b) {
          const x = a.login.toLowerCase();
          const y = b.login.toLowerCase();
          if (x < y) {return -1; }
          if (x > y) {return 1; }
          return 0;
      });
      }
      if (type === 'rankAsc') {
        this.pagedItems.sort(function(a, b) {return a.score - b.score; });
        }
        if (type === 'rankDesc') {
          this.pagedItems.sort(function(a, b) {return b.score - a.score; });
          }

}
setPage(page: number) {
  // get pager object from service
  this.pager = this.pagerService.getPager(this.allItems.length, page);

  // get current page of items
  this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
detailsClicked(details, index) {
  this.selectedDetails = index;
  this.http.get(details.repos_url)
    .map((res: Response) => res.json() ).subscribe((repos) => {
      this.repoData = repos;
    });
}
}

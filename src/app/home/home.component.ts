import { Component, OnInit } from '@angular/core';
import {CommanService} from '../services/comman/comman.service';
import { first } from 'rxjs/operators';
import {PagerService} from '../services/_pagination/pagination';
import {number} from 'ng2-validation/dist/number';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  tableData = [];

  private allItems: any[];  // array of all items to be paged
  pager: any = {};  // pager object
  pagedItems: any[]; // paged items

  constructor(
    private _httpService: CommanService,
    private _pager: PagerService
  ) { }

  ngOnInit() {
    this.getTabledata();
  }

  getTabledata() {
    this._httpService.GetUserData().pipe(first()).subscribe(data => {
      this.allItems = [];
      this.allItems = data['body'];
      this.setPage(1);
    });
  }

  setPage(page: number) {
    console.log('pager', page)
    if (page < 1 || page > this.pager.totalPages ) {
      return ;
    }
    this.pager = this._pager.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  edit(id: any) {
    console.log('ID', id);
  }

}

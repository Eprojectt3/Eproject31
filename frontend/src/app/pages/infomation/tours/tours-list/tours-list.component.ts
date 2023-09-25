import { Tour, tours } from 'src/app/models/tour';
import { Component, OnInit } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss'],
})
export class ToursListComponent implements OnInit {
  filters: Filter[] = filter;
  isGridView: boolean = true;
  isLineView: boolean = false;
  ts: Tour[] = tours;

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tours list');
  }

  setGridView() {
    this.isGridView = true;
    this.isLineView = false;
    console.log(this.isGridView);
  }

  setLineView() {
    this.isGridView = false;
    this.isLineView = true;
    console.log(this.isGridView);
  }
}

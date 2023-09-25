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

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tour List');
  }
}

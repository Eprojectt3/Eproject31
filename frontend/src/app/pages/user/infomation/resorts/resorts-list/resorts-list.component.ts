import { Component } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-resorts-list',
  templateUrl: './resorts-list.component.html',
  styleUrls: ['./resorts-list.component.scss'],
})
export class ResortsListComponent {
  filters: Filter[] = filter;
  tours: Tour[] = tours;
  selected = 'none';

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Resort List');
  }
}

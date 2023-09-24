import { Component } from '@angular/core';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent {
  tours: Tour[] = tours;
  selected = 'none';

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tour List');
  }
}

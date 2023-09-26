import { Component } from '@angular/core';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent {
  tours: Tour[] = tours;
  selected = 'none';

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Restaurant List');
  }
}

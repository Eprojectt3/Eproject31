import { Component, OnInit } from '@angular/core';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {

  tours: Tour[] = tours;
  selected = 'none';

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('HoTel List');
  }

}

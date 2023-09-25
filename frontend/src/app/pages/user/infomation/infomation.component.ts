import { Component, OnInit } from '@angular/core';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss'],
})
export class InfomationComponent implements OnInit {
  tours: Tour[] = tours;
  responsiveOptions: any[] = [
    {
      breakpoint: '2000px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1,
    },
  ];

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitleValue('Infomation');
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Resort } from 'src/app/models/resort';
import { Tour } from 'src/app/models/tour';
import { ResortService } from 'src/app/services/resort.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-resorts-list',
  templateUrl: './resorts-list.component.html',
  styleUrls: ['./resorts-list.component.scss'],
})
export class ResortsListComponent {
  filters: Filter[] = filter;

  resorts!: Resort[]
  selected = 'none';

  constructor(private titleService: TitleService, private resortSecvice :ResortService) {}

  ngOnInit(): void {

    this.titleService.setTitleValue('Resort List');
    this.resortSecvice.getListResort().subscribe((val:any)=>{
      this.resorts = val;
      console.log( this.resorts = val)
    })
  }
}

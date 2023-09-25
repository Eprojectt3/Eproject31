<<<<<<< HEAD
import { Component } from '@angular/core';
import { Tour, tours } from 'src/app/models/tour';
=======
import { Component, OnInit } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
>>>>>>> 7c8fd51 (son fe tour list and detail 26-09-2023)
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss'],
})
<<<<<<< HEAD
export class ToursListComponent {
  tours: Tour[] = tours;
  selected = 'none';
=======
export class ToursListComponent implements OnInit {
  filters: Filter[] = filter;
  isGridView: boolean = true;
  isLineView: boolean = false;
>>>>>>> 7c8fd51 (son fe tour list and detail 26-09-2023)

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.titleService.setTitleValue('Tour List');
=======
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
>>>>>>> 7c8fd51 (son fe tour list and detail 26-09-2023)
  }
}

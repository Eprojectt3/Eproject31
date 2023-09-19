import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  urlImage: string = 'url(../../../assets/images/cat-ba-3553145_1920 1.jpg)';
  titleValue!: Observable<string | null>;

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleValue = this.titleService.$titleSubject;
  }
}

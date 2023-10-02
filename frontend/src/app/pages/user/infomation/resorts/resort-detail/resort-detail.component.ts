import { Component } from '@angular/core';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel } from 'src/app/models/hotel';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-resort-detail',
  templateUrl: './resort-detail.component.html',
  styleUrls: ['./resort-detail.component.scss']
})
export class ResortDetailComponent {
  hotels!: Hotel[];
  constructor(private titleService: TitleService) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Resort Detail');
  }
}

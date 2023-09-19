import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import {
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('About us');
  }


  fatwitter = faTwitter;
  faFace = faFacebook;

}

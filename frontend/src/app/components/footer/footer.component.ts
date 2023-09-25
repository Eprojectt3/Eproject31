import { Component } from '@angular/core';
import {
  faFacebook,
  faLinkedin,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faLinkedin = faLinkedin;
  fatwitter = faTwitter;
  faMess = faTelegram;
  faFace = faFacebook;
}

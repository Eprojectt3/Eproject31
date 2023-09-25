import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Eproject3';
}

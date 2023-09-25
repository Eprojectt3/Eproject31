import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  show = (): void => {
    this.isLoading.next(true);
  };

  close = (): void => {
    this.isLoading.next(false);
  };
}

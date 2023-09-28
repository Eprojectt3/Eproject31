import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public $titleSubject: BehaviorSubject<string | null>;

  constructor() {
    this.$titleSubject = new BehaviorSubject<string | null>(null);
  }

  public get getTitleValue(): string | null {
    return this.$titleSubject?.value;
  }

  setTitleValue(value: string): void {
    this.$titleSubject?.next(value);
  }
}

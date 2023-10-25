import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resort } from 'src/app/models/resort.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-detail-resort',
  templateUrl: './detail-resort.component.html',
  styleUrls: ['./detail-resort.component.scss']
})
export class DetailResortComponent {
  public resort!: Resort;
  public id!: number;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.placeService.getPlaceById(this.id).subscribe((val: any) => {
      this.resort = val;
    });
  }
}

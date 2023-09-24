import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel } from 'src/app/models/hotel';
import { Resort } from 'src/app/models/resort';
import { ResortService } from 'src/app/services/resort.service';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-resort-detail',
  templateUrl: './resort-detail.component.html',
  styleUrls: ['./resort-detail.component.scss']
})
export class ResortDetailComponent {
  resort!: Resort;
  constructor(private titleService: TitleService, private resortService: ResortService, private route:ActivatedRoute) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Resort Detail');

    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id')

        if(id){
          this.resortService.getDetailResort(id).subscribe({
            next:(response:any)=>{
              this.resort=response;
              console.log(this.resort=response);
            }
          })

        }
      }
    })
  }
}

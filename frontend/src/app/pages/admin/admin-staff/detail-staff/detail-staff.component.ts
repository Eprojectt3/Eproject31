import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.scss']
})
export class DetailStaffComponent implements OnInit {
  public staff!: Staff;
  public id!: number;

  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.staffService.getDetailStaff(this.id).subscribe((val: any) => {
      this.staff = val;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';

import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedBack } from '../../../../models/feedback.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreateFeedComponent } from '../create-feed/create-feed.component';


@Component({
  selector: 'app-list-feedbacks',
  templateUrl: './list-feedbacks.component.html',
  styleUrls: ['./list-feedbacks.component.scss']
})
export class ListFeedbacksComponent implements OnInit {
  public feedBacks!: FeedBack[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = ['id', 'name', 'title','email','phone', 'action'];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.getListFeedBack();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListFeedBack();
  };

  // Get list FeedBack
  public getListFeedBack = () => {
    this.feedbackService
      .getFeedBacks(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.feedBacks = val.data;
        this.totalSize = val.count;
      });
  };

  // Create FeedBack
  public openCreateCate = () => {
    const dialogRef = this.dialog.open(CreateFeedComponent, {
      height: '230px',
      width: '400px',
    });
  };

  public openUpdateFeed = (data:any) => {
    const dialogRef = this.dialog.open(CreateFeedComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getListFeedBack();
        }
      }
    })
  };
  // Delete Feed

  public deleteFeedback = (id:string) => {
    this.feedbackService.deleteFeedback(id).subscribe(val=>{
      this.feedbackService
      .getFeedBacks(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.feedBacks = val.data;
        this.totalSize = val.count;
      });
    })
  }


}

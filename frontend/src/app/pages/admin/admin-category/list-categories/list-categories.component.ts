import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { UpdateCateComponent } from '../update-cate/update-cate.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  public categories!: Category[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = ['id', 'name', 'action'];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getListCategories();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListCategories();
  };

  // Get list Category
  public getListCategories = () => {
    this.categoryService
      .getCategories(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.categories = val.data;
        this.totalSize = val.count;
      });
  };

  // Create cate
  public openCreateCate = () => {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      height: '230px',
      width: '400px',
    });
  };

  public isShowCreateHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/categories/create');
  };

 

  public isUpdateCategory = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/categories/update/');
  };
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

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
  public dataSource = new MatTableDataSource<Category>([]);

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListCategories();
      }
    });

    // Get list hotel pagination
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
        this.dataSource = val.data;
      });
  };

  // Create cate
  public openCreateCate = () => {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListCategories();
        }
      },
    });
  };
  public openUpdateCate = (data: any) => {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListCategories();
        }
      },
    });
  };

  public deleteCategory = (id: string) => {
    this.categoryService.deleteCategory(id).subscribe((val) => {
      this.categoryService
        .getCategories(this.index, this.pageSize)
        .subscribe((val: any) => {
          this.categories = val.data;
          this.totalSize = val.count;
        });
    });
  };

  public isUpdateCategory = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/categories/update/');
  };
}

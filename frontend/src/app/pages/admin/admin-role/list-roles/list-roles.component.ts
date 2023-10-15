import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';


import { ActivatedRoute, Route, Router } from '@angular/router';
import {  Role1 } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { DialogCreateComponent } from '../../admin-category/dialog-create/dialog-create.component';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {
  public roles!: Role1[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = ['id', 'name', 'action'];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.getListRole();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListRole();
  };

  // Get list Role
  public getListRole = () => {
    this.roleService
      .getListRolePagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.roles = val.data;
        this.totalSize = val.count;
      });
  };

  // Create Role
  public openCreateRole = () => {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getListRole();
        }
      }
    })
  };

  public openUpdateRole= (data:any) => {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getListRole();
        }
      }
    })
  };
  // Delete Feed

  public deleteRole = (id:number) => {
    this.roleService.deleteRole(id).subscribe(val=>{
      this.roleService
      .getListRolePagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.roles = val.data;
        this.totalSize = val.count;
      });
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUser, user } from 'src/app/models/admin_user';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users!: User[];
  displayedColumns: string[] = [
    'username',
    'email',
    'name',
    'phone',
    'roleid',
    'action',
  ];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((val) => {
      this.users = val;
    });
  }
}

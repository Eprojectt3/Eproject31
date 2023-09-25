import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users!: User[];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((val) => {
      this.users = val;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  searchText: string = '';
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, 
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
    this.dataSource = new MatTableDataSource(this.userService.getUsers());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUserForm(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, { data: user });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadUsers();
    });
  }

  confirmDelete(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.deleteUser(userId);
        this.loadUsers();
      }
    });
  }
  editUser(user: User) {
    // this.router.navigate(['/edit-user', user.id]);
    
    const dialogRef = this.dialog.open(UserFormComponent, { data: user });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadUsers();
    });
  }
}

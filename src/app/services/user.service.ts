import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return [...this.users];
  }

  addUser(user: User) {
    user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push(user);
    this.saveUsers();
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsers();
  }
}

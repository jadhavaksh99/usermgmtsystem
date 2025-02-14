import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/users', pathMatch: 'full' }, // Default route
  { path: 'users', component: UserListComponent }, // User list page
  { path: 'adduser', component: UserFormComponent }, // Add User
  { path: 'edit-user/:id', component: UserFormComponent }, // Edit User with ID
  //{ path: '**', redirectTo: '/users' } // Redirect invalid URLs


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

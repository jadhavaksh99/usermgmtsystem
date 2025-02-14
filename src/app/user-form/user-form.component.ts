import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
     
  ) {
    
    
    
    this.userForm = this.fb.group({
      name: [user?.name || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      role: [user?.role || 'User', Validators.required]
    });

    const userId = this.route.snapshot.paramMap.get('id');
  if (userId) {
    const existingUser = this.userService.getUsers().find(u => u.id === +userId);
    if (existingUser) {
      this.userForm.patchValue(existingUser);
    }
  }
  }

  
  saveUser() {
    if (this.user) {
      this.userService.updateUser({ ...this.user, ...this.userForm.value });
    } else {
      this.userService.addUser(this.userForm.value);
    }
    this.router.navigate(['/users']);
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(true
    );
  }
}

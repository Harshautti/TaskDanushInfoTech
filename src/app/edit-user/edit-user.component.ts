import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';



@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent  {
  dialogref = inject(MatDialogRef)
  userService = inject(UserService)

  editForm = new FormGroup({
    username : new FormControl(),
    email : new FormControl(),
    phone : new FormControl(),
    id : new FormControl(),
  })
  close(){
    this.dialogref.close()
  }
  editUser(){
    let body = {
      username : this.editForm.get('username')?.value,
      email : this.editForm.get('email')?.value,
      phone : this.editForm.get('phone')?.value,
      id : this.editForm.get('id')?.value
    }
    this.userService.updateUser(body.id,body).subscribe((res)=>{
      console.log(res)
    })
    this.dialogref.close()
  }
  constructor(){
    this.userService.editData(this.editForm)
  }
   
}

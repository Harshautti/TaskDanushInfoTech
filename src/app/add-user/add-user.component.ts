import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  dialog = inject(MatDialogRef)
  userService = inject(UserService)
    regForm = new FormGroup({
      username : new FormControl(null,[Validators.required,Validators.minLength(4)]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      mobile : new FormControl(null,[Validators.required])
    })
    newUser:any
    addUser(){
      if(this.regForm.valid){
        let username = this.regForm.get('username')?.value
        let email = this.regForm.get('email')?.value
        let mobile = this.regForm.get('mobile')?.value
        let body ={
          username : username,
          email : email,
          phone : mobile
        }
        this.userService.adduser(body).subscribe((res)=>{
        this.newUser = res
        // this.userService.newPerson(this.newUser)
          console.log(res)
        })
        this.dialog.close()
        }
      }
  close(){
    this.dialog.close()
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormGroup } from '@angular/forms';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userService = inject(UserService)
  dialog = inject(MatDialog)
  constructor(private http : HttpClient){
    // this.authuser()
    this.getdata()
  }

  users:any[] = []
  // authuser(){
  //   this.http.get('https://dummyjson.com/auth/me').subscribe((res:any)=>{
  //       this.user = res
  //   })
  // }
 getdata(){
    this.userService.getdata().subscribe((res:any)=>{
      this.userService.filter.subscribe((search:any)=>{
        if(search==''){
          this.users = res.users
        }
        else{
          this.users = res.users.filter((data:any)=>{
           return data.username.includes(search)
          })
        }
      })
    })
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe((res)=>{
      console.log(res)
    })
  }
//  addUser(){
//   this.userService.addUser.subscribe((res:any)=>{
//     console.log(res)
//  })
// }

  edit(id:number){
  let user = this.users.find((data:any)=>{
   return  data.id === id
  })
  if(user){
    // console.log(user)
    this.userService.editForm.subscribe((res:any)=>{
     if(res as FormGroup){
      res.patchValue({
        username : user.username,
        email : user.email,
        phone : user.phone,
        id : user.id
      })
     }
    })
    this.dialog.open(EditUserComponent)
  }
}

}
 
 
  
  


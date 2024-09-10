import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router,private http:HttpClient){
    localStorage.removeItem('jwt-token')
  }

  loginForm = new FormGroup({
          username : new FormControl(null,[Validators.required]),
          password : new FormControl(null,Validators.required)
  })
  login(){
   if(this.loginForm.valid){
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value
    let body = {
      username :username,
      password:password
    }
    this.http.post('https://dummyjson.com/auth/login',body).subscribe((res:any)=>{
      localStorage.setItem('jwt-token',res.token)
      // console.log(res)
      this.router.navigate(['/dashboard'])
    })
   }
  }
 
}

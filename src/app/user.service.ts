import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  beSub = new BehaviorSubject<any>('')
  editSub = new BehaviorSubject<any>('')
  filter = this.beSub.asObservable()
  editForm = this.editSub.asObservable()
  // addUser = this.beSub.asObservable()
  // newPerson(newUser:any){
  //   this.beSub.next(newUser)
  // }

  constructor(){ 

   }

  http = inject(HttpClient)
 
  getdata(){
   return this.http.get('https://dummyjson.com/users')
  }
  adduser(body:any){
    return this.http.post('https://dummyjson.com/users/add',body)
  }
  updateUser(id:number,body:any){
    return this.http.put('https://dummyjson.com/users/'+id,body)
  }
  deleteUser(id:number){
      return this.http.delete('https://dummyjson.com/users/'+id)
  }
  filterData(searchTerm:string){
    this.beSub.next(searchTerm)
  }
  editData(editData:any){
    this.editSub.next(editData)
  }
 
}

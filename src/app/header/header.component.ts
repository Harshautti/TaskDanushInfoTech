import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, MatButtonModule, MatDialogModule,
    AddUserComponent, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userService = inject(UserService)
  dialog = inject(MatDialog)

  constructor(private router: Router) {

  }
  http = inject(HttpClient)
  logout() {
    localStorage.removeItem('jwt-token')
    this.router.navigate(['/login'])
  }
  openDialog() {
    this.dialog.open(AddUserComponent)
  }
  searchTerm: string = ''
  filter() {
    this.userService.filterData(this.searchTerm)
  }

}

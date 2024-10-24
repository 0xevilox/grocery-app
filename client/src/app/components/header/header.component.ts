import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAdmin = false
  token = false
  cartList: any[] = []

  constructor(private route: Router, private http:HttpClient,) {
    const userId = localStorage.getItem('userId')
    this.http.get<any[]>(`http://localhost:5100/cart/${userId}`).subscribe(data => {
      this.cartList = data;
    });
    const token = localStorage.getItem('jwtToken')
    if (token) {
      this.isAdmin = false
      localStorage.removeItem('adminJwtToken')
      this.token = true
    }
    const jwtToken = localStorage.getItem("adminJwtToken")
    if (jwtToken) {
      localStorage.removeItem('jwtToken')
      this.isAdmin = true
      this.token = true
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      this.isAdmin = false
      localStorage.removeItem('adminJwtToken')
    }
    const jwtToken = localStorage.getItem("adminJwtToken")
    if (jwtToken) {
      localStorage.removeItem('jwtToken')
      this.isAdmin = true
    }
  }

  onLogout() {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('adminJwtToken')
    window.alert("Logout Successful!")
    this.route.navigate(['/home'])
    this.isAdmin = false
    this.token = false
  }
}

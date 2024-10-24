import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public data = [
    {
      name:'Ordres',
      count:'100',
      routerLink:'/admin/users'
    },
    {
      name:'Ordres',
      count:'100',
      routerLink:'/admin/orders'
    },
    {
      name:'Ordres',
      count:'100',
      routerLink:'/admin/orders'
    },
    {
      name:'Ordres',
      count:'100',
      routerLink:'/admin/orders'
    },
    {
      name:'Ordres',
      count:'100',
      routerLink:'/admin/orders'
    }
  ]

  public usersList: any[] = []
  public ordersList: any[] = []
  public paymentsList: any[] = []
  public isLoading = false;

  constructor(private http:HttpClient){
    this.isLoading = true
    this.http.get<any[]>('http://localhost:5100/users').subscribe((data)=>{
      this.usersList = data
      this.isLoading = false
    })

    this.http.get<any[]>('http://localhost:5100/orders').subscribe((data)=>{
      this.ordersList = data
    })

    this.http.get<any[]>('http://localhost:5100/users').subscribe((data)=>{
      this.paymentsList = data
      console.log(this.paymentsList)
    })

  }
}

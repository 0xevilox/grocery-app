import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  public myOrdersList: any[] = [];
  public isLoading = false;

  constructor(private http:HttpClient){
    this.isLoading = true
    const userId = localStorage.getItem('userId')
    this.http.get<any[]>(`http://localhost:5100/my-orders/${userId}`).subscribe((res) => {
      this.myOrdersList = res 
      this.isLoading = false
      console.log(res)
    })
  }

}

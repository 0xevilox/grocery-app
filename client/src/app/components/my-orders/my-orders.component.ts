import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  public myOrdersList: any[] = [];
  public isLoading = false;

  constructor(private http: HttpClient) {
    this.isLoading = true;
    const userId = localStorage.getItem('userId');
    this.http.get<any[]>(`http://localhost:5100/my-orders/${userId}`).subscribe((res: any) => {
      if (res.status !== 404) {
        this.myOrdersList = res;
        this.isLoading = false;
      } else {
        this.myOrdersList = []
        this.isLoading = false
      }
    });
  }

  onCancelOrder(id: string): void {
    this.http.put(`http://localhost:5100/cancel-order/${id}`, { status: 'Canceled' }).subscribe((res) => {
      console.log(res);
      alert('Order Canceled Successfully!..');
    });
    const userId = localStorage.getItem('userId');
    this.http.get<any[]>(`http://localhost:5100/my-orders/${userId}`).subscribe((res: any) => {
      if (res.status !== 404) {
        this.myOrdersList = res;
        this.isLoading = false;
      } else {
        this.myOrdersList = []
        this.isLoading = false
      }
    });
  }
}

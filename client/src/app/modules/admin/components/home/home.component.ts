import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public data: any[] = [];
  public searchText: string;
  public isUpdate = false;
  public isLoading = false;



  constructor(private http: HttpClient, private route: Router) {
    this.isLoading = true;
    
    this.searchText = '';
    this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
      this.data = data;
      this.isLoading = false;
    });
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (!jwtToken){
      window.alert("You can't Access this!")
      this.route.navigate(['/login'])
    }
  }

  filterData() {
    if (this.searchText) {
      return this.data.filter((product) =>
        product.productname.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      return this.data;
    }
  }



  onDelete(productId: string): void {
    // this.isLoading = true;
    this.http.delete(`http://localhost:5100/products/${productId}`).subscribe((res) => {
      if (res) {
        window.alert("Product Deleted Successfully!")
        this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
          this.data = data;
          // this.isLoading = false;
        });
      }
    })
  }
}

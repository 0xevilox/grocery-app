import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  public data: any[] = [];
  public searchInput: string = '';
  public itemId: string;
  public product: any = {};
  public isLoading = false;
  fruitsSelected = '';
  vegitablesSelected = '';

  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.isLoading = true;
    this.itemId = ''
    this.product = {}
    this.regForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      paymentMethod: new FormControl(null, Validators.required)
    })
    this.searchInput = '';
    this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
      this.data = data;
      this.isLoading = false
    });
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      window.alert("You can't Access this!")
      this.route.navigate(['/admin/home'])
    }
  }

  filterItems() {
    return this.data.filter(product => {
      const searchMatch =
        !this.searchInput ||
        product.productname.toLowerCase().includes(this.searchInput.toLowerCase());

      const categoryMatch =
        ((!this.fruitsSelected && !this.vegitablesSelected ) ||
          (this.fruitsSelected && product.category === 'fruits') ||
          (this.vegitablesSelected && product.category === 'vegitables'));

      return searchMatch && categoryMatch;
    });
  }


  onAddToCart(productId: string): void {
    const userId = localStorage.getItem('userId')
    this.http.post('http://localhost:5100/add-to-cart', { userId, productId }).subscribe(
      (response) => {
        window.alert('Product added to cart!');
      },
      (error) => {
        console.error(error);
        window.alert('Error occurred while adding the product to cart!');
      }
    );
  }

//   onBuyNow(orderDetails = { user: String, phone: String, productId: this.itemId, address1: String, address2: String }): void {
//     const token = localStorage.getItem("jwtToken")
//     if (!token) {
//       this.route.navigate(['/login'])
//     } else {
//       const order = {
//         user: orderDetails.user,
//         phone: orderDetails.phone,
//         productId: this.itemId,
//         address1: orderDetails.address1,
//         address2: orderDetails.address2
//       };
//       this.http.post(`http://localhost:5100/order`, order).subscribe((res) => {
//         if (res) {
//           window.alert("Product Placed Successfully!");
//           this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
//             this.data = data;
//           });
//         }
//       });
//     }
//   }
}

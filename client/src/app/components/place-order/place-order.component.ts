import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  public data: any[] = [];
  public searchText: string;
  public routerId: string;
  public product: any = {};
  public isLoading = false;
  public isSuccess = false;

  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router, private activatedRoute: ActivatedRoute) {
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.route.navigate(['/admin/home'])
    }
    const token = localStorage.getItem("jwtToken")
    if (!token) {
      window.alert("You can't Access this! because your not an loggedin user!")
      this.route.navigate(['/login'])
    }
    this.routerId = '';
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.routerId = idParam;
    }

    this.product = {}
    this.regForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      paymentMethod: new FormControl(null, Validators.required)
    })
    this.searchText = '';
    this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
      this.data = data;
    });

  }

  filterData() {
    this.isLoading = true;
    if (this.searchText) {
      this.isLoading = false;
      return this.data.filter((product) =>
        product.productname.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.isLoading = false;
      return this.data;
    }
  }


  onAddToCart(productId: string): void {
    this.isLoading = true;
    this.http.post('http://localhost:5100/add-to-cart', { "productId": productId }).subscribe((res) => {
      if (res) {
        window.alert("Product Added to cart!")
        this.isLoading = false;
      }else{
        this.isLoading = false;
      }
    })
  }  

  createOrder(orderDetails = {firstname:String,lastname:String, phone: String, productId: this.routerId, address: String, quantity: String, paymentMethod: String }): void {
    this.isLoading = true;
    const userId = localStorage.getItem('userId')
    const order = {
      firstname:orderDetails.firstname,
      lastname:orderDetails.lastname,
      user: userId,
      phone: orderDetails.phone,
      productId: this.routerId,
      quantity: orderDetails.quantity,
      address: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod
    };
    console.log(order)
    this.http.post('http://localhost:5100/orders',order).subscribe((response) => {
      window.alert("Order Created Successfully!")
      this.isLoading = false;
      this.isSuccess = true
      this.regForm.reset()
    }, (error) => {
      window.alert("Failed to Create Order!")
      console.log(error);
      this.isLoading = false;
    });
  }

  onContinue(){
    this.isSuccess = false
  }
}

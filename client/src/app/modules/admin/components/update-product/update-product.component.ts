import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  public data: any[] = [];
  public productDetails2 = {};
  public isLoading = false;
  
  regForm: FormGroup;
  

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.regForm = new FormGroup({
      productname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      countInStock: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
    });

    const productId = this.route.snapshot.paramMap.get('id');
    this.http
      .get(`http://localhost:5100/products/${productId}`)
      .subscribe((res) => {
        this.productDetails2 = res 
      });

    const jwtToken = localStorage.getItem('adminJwtToken');
    if (!jwtToken) {
      window.alert("You can't access this!");
      this.router.navigate(['/login']);
    }

  }

  onUpdate(productDetails: {
    productname: string;
    description: string;
    price: string;
    image: string;
    category: string;
    countInStock: string;
    rating: string;
  }): void {
    this.isLoading = true;
    const productId = this.route.snapshot.paramMap.get('id');
    this.http
      .put(`http://localhost:5100/products/${productId}`, productDetails)
      .subscribe((res) => {
        if (res) {
          window.alert('Product Updated Successfully!');
          this.router.navigate(['/admin/dashboard'])
          this.http
            .get<any[]>('http://localhost:5100/products')
            .subscribe((data) => {
              this.data = data;
              this.isLoading = false;
            });
        }
      });
      
  }
}

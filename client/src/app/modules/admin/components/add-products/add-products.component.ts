import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  regForm: FormGroup;
  public isLoading = false;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      productname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      countInStock: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (!jwtToken){
      window.alert("You can't Access this!")
      this.route.navigate(['/login'])
    }

  }

  onSubmit(details = { productname: String, description: String, price: String, brand: String, image: String, category: String, countInStock: String, rating: String }): void {
    this.isLoading = true;
    this.http.post('http://localhost:5100/add-products', details).subscribe((response) => {
      window.alert("Product Added Successfully!");
      // this.regForm.reset();
      this.isLoading = false;
    });
  }
  

}

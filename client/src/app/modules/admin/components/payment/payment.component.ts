import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public data: any[] = [];
  public isUpdate = false;
  public isManage = false;
  public paymentId: String = '';

  statusForm: FormGroup;

  constructor(private http:HttpClient){
    this.http.get<any[]>('http://localhost:5100/payments').subscribe((response) => {
      this.data = response
    })
    this.statusForm = new FormGroup({
      status: new FormControl('pending'),
      amount: new FormControl(null, Validators.required)
    });
    
  }

  onChangeStatus(id:string):void{
    this.paymentId = id 
    this.isUpdate = true;
  }

  onSubmit(paymentDetails={status:String,amount:String}): void {
    this.http.put(`http://localhost:5100/payment/${this.paymentId}`, paymentDetails).subscribe(
      (res) => {
        window.alert('Payment Status Updated!');
        this.isUpdate = false;
        this.http.get<any[]>('http://localhost:5100/payments').subscribe((response) => {
          this.data = response
        })
      },
      (error) => {
        console.error(error);
        window.alert('Failed to update Payment status');
      }
    );
  }
}

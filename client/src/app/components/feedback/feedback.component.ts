import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  regForm: FormGroup;
  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken){
      this.route.navigate(['/admin/home'])
    }
    const token = localStorage.getItem("jwtToken")
    if (!token) {
      window.alert("You can't Access this! because your not an Admin!")
      this.route.navigate(['/login'])
    }
  }

  onSubmit(details: { user: string,message: string}): void {
    this.http.post('http://localhost:5100/feedback', details).subscribe((response) => {
      window.alert('Feedback Submitted Successfully!');
      this.route.navigate(['/home'])
    }, error => {
      window.alert('Feedback Failed!');
      console.log(error);
    });
  }
}

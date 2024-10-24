import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  public data: any[] = [];
  public isLoading = false;

  constructor(private http:HttpClient){
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:5100/feedback').subscribe(data => {
      this.data = data;
      this.isLoading = false;
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: any[] = [];
  public isLoading = false

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true
    this.http.get<any[]>('http://localhost:5100/users').subscribe(
      users => {
        this.users = users;
        this.isLoading = false
      },
      error => {
        console.error(error);
      }
    );
  }
}

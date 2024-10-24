import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){
    
  }

  onShop(){
    const token = localStorage.getItem('jwtToken')
    if(!token){
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/shopping'])
    }
  }
}

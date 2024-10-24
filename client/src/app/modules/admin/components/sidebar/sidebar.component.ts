import { Component } from '@angular/core';
import { faBars, faTachometerAlt, faShoppingBag, faShoppingCart, faTags, faMoneyBill,faComment,faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public isSidebarHidden = false;
  public barIcon = faBars

  public data = [
    {
      path: '/admin/dashboard',
      icon: faTachometerAlt,
      name: 'Dashboard'
    },
    {
      path: '/admin/users',
      icon: faUsers,
      name: 'Users'
    },
    {
      path: '/admin/products',
      icon: faShoppingBag,
      name: 'Products'
    },
    {
      path: '/admin/add-products',
      icon: faShoppingCart,
      name: 'Add Products'
    },
    {
      path: '/admin/add-categories',
      icon: faTags,
      name: 'Add Category'
    },{
      path: '/admin/orders',
      icon: faShoppingCart,
      name: 'Orders'
    },
    {
      path: '/admin/feedback',
      icon: faComment,
      name: 'Feedback'
    }
  ];

  constructor() {
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}


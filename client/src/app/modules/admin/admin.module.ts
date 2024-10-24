import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

// library.add(faBars);

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentComponent } from './components/payment/payment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddProductsComponent,
    AddCategoriesComponent,
    FeedbackComponent,
    LoaderSpinnerComponent,
    SidebarComponent,
    DashboardComponent,
    PaymentComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule
  ]
})
export class AdminModule { }

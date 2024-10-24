import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { UpdateProductComponent } from './modules/admin/components/update-product/update-product.component';
import { OrdersComponent } from './modules/admin/components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { BundlePackComponent } from './components/bundle-pack/bundle-pack.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    LandingPageComponent,
    HeaderComponent,
    MyCartComponent,
    UpdateProductComponent,
    OrdersComponent,
    ProductDetailsComponent,
    PlaceOrderComponent,
    FeedbackComponent,
    LoaderSpinnerComponent,
    MyOrdersComponent,
    HistoryComponent,
    HomeComponent,
    CategoriesComponent,
    ProductComponent,
    BundlePackComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

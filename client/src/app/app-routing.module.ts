import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'shopping',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
  },
  {
    path: 'my-cart',
    component: MyCartComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'place-order/:id',
    component: PlaceOrderComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

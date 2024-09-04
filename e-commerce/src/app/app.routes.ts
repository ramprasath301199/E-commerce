import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  {
    path: "home/:id",
    pathMatch: "full",
    loadComponent: () => import("./pages/details/details.component").then(c => c.DetailsComponent)
  },
  {
    path: "",
    loadComponent: (() => import('./pages/login/login.component').then(m => m.LoginComponent)),
    pathMatch: "full"
  },
  {
    path: "login",
    pathMatch: "full",
    loadComponent: (() => import('./pages/login/login.component').then(m => m.LoginComponent)),
  },
  {
    path: "signup",
    pathMatch: "full",
    loadComponent: (() => import('./pages/signup/signup.component').then(m => m.SignupComponent)),
  },
  {
    path: "cart",
    pathMatch: "full",
    loadComponent: (() => import('./pages/addcart/addcart.component').then(m => m.AddcartComponent)),
  },
  {
    path: "home",
    pathMatch: "full",
    loadComponent: (() => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)),
  },
  {
    path: "buynow",
    pathMatch: "full",
    loadComponent: (() => import("./pages/buynow/buynow.component").then(m => m.BuynowComponent))
  },
  {
    path: "**",
    pathMatch: "full",
    loadComponent: (() => import('./pages/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent)),
  },
];

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { FormArray, FormBuilder, FormGroup, FormsModule, MaxLengthValidator, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
@Component({
  selector: 'app-buynow',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FontAwesomeModule, MatStepperModule, MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './buynow.component.html',
  styleUrl: './buynow.component.css'
})
export class BuynowComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title = "buynow"
  isLinear = false;
  myform: FormGroup;
  cart = "cart";
  cartdatas: any;
  total: number = 0;
  subtotal: number = 0;
  plus = faPlusCircle;
  minus = faMinusCircle;
  alldata: any;
  constructor(private fb: FormBuilder, private service: DataService, private router: Router) {
    this.myform = this.fb.group({
      quantities: this.fb.array([])  // FormArray for quantities
    });
    this.firstFormGroup = this.fb.group({
      fname: '',
      lname: '',
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.max(10)]],
    })
    this.secondFormGroup = this.fb.group({
      pincode: '',
      address: '',
      state: '',
      district: ''
    })
  }
  mobile(event: any) {
    console.log(event)
  }
  get quantities(): FormArray {
    return this.myform.get('quantities') as FormArray;
  }
  ngOnInit(): void {
    this.service.getcart(this.service.getdata("name")).subscribe((data: any) => {
      this.alldata = data;
      this.cartdatas = data[0].cartdatas;
      this.caluculateTotals();
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        this.router.navigate(["/login"]);
      }
    });
  }
  decrease(index: number, stock: any) {
    const currentQty = this.quantities.at(index).value;
    if (currentQty > 1) {
      this.quantities.at(index).setValue(currentQty - 1);
      this.caluculateTotals();
      this.updateCart();
    }
  }
  caluculateTotals() {
    this.total = 0;
    this.subtotal = 0;
    this.cartdatas.forEach((item: any, i: any) => {
      // Calculate totals
      // Initialize quantity in the form array with default value 1
      if (item.quantity) {
        this.quantities.push(this.fb.control(item.quantity));
      } else {
        this.quantities.push(this.fb.control(1));
      }
      this.total += (item.price) * this.quantities.at(i).value / (1 - item.discountPercentage / 100);
      this.subtotal += item.price * this.quantities.at(i).value;
    });
  }
  increase(index: number, stock: any) {
    const currentQty = this.quantities.at(index).value;
    if (currentQty < stock)
      this.quantities.at(index).setValue(currentQty + 1);
    else
      alert(`Stock only Available ${currentQty} Products`)
    this.caluculateTotals();
    this.updateCart();
  }
  updateCart() {
    const updatedCartData = this.cartdatas.map((item: any, i: number) => ({
      ...item,
      quantity: this.quantities.at(i).value
    }));
    this.service.updatecart(this.service.getdata("name"), updatedCartData).subscribe((data: any) => {
      if (data.message == "updated") {
        console.log("updated");
      }
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        this.router.navigate(["/login"]);
      }
    })
  }
  remove(item: any) {
    if (confirm("Are You Sure You Want To Delete")) {
      const updatedCartData = this.cartdatas.filter((data: any) => data._id !== item._id);
      this.service.updatecart(this.service.getdata("name"), updatedCartData).subscribe((data: any) => {
        if (data.message == "updated") {
          this.cartdatas = updatedCartData;
        }
      }, err => {
        if (err.error == "token expired" || err.error == "No token provided") {
          this.router.navigate(["/login"]);
        }
      })
    }
  }
}

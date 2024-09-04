import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../services/data.service';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcart',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, MatCardModule, MatButton,
    ReactiveFormsModule, CommonModule, MatCardImage, RouterLink, FontAwesomeModule
  ],
  templateUrl: './addcart.component.html',
  styleUrl: './addcart.component.css'
})
export class AddcartComponent implements OnInit {
  myform: FormGroup;
  cart = "cart";
  cartdatas: any;
  total: number = 0;
  subtotal: number = 0;
  plus = faPlusCircle;
  minus = faMinusCircle;
  alldata: any;
  constructor(private service: DataService, private router: Router, private fb: FormBuilder) {
    // Initialize the form with a FormArray to handle quantities
    this.myform = this.fb.group({
      quantities: this.fb.array([])  // FormArray for quantities
    });
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

      }
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        this.router.navigate(["/login"]);
      }
    })
  }

}

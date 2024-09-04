import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatCheckboxModule, MatRadioModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  ratings: FormGroup;
  cat: any = "";
  category: any[] = [];
  brands: any[] = [];
  selectedValue: any;
  checkbox: any;

  constructor(private service: DataService, private router: Router, private fb: FormBuilder) {
    this.ratings = this.fb.group({
      cat: "",
      rate4: false,
      rate3: false,
      brands: "",
    })
  }
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {
    this.service.getproducts().subscribe((data: any) => {
      data.forEach((ele: any) => {
        if (!this.category.includes(ele.category)) {
          this.category.push(ele.category)
        }
        if (!this.brands.includes(ele.brand)) {
          this.brands.push(ele.brand)
        }
        // console.log(this.brands)
      });
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        // alert("Please Login First");
        this.router.navigate(["/login"]);
      }
    })
  }
  selectchange(event: any) {
    this.selectedValue = this.ratings.value;
  }
}

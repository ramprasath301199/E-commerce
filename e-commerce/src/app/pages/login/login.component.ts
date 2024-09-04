import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ height: '0px', 'padding-top': '0', 'padding-bottom': '0' }),  // initial
        animate('0.3s',
          style({ height: '*', 'padding-top': '*', 'padding-bottom': '*' }))  // final
      ]),
      transition(':leave', [
        style({ height: '*', 'padding-top': '*', 'padding-bottom': '*', opacity: 1 }),  // initial
        animate('0.3s',
          style({ height: '0px', 'padding-top': '0', 'padding-bottom': '0', opacity: 0 }))  // final
      ])
    ])
  ]
})
export class LoginComponent {
  errname: string = "";
  errpass: String = "";
  eye = faEyeSlash;
  type = "password";
  myform: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private service: DataService) {
    this.service.checkToken(this.service.getdata("token")).subscribe((data: any) => {
      if (data.message == "valid") {
        if (this.service.getdata("name")) {
          this.router.navigate(["/home"])
        } else {
          this.router.navigate(["/login"])
        }
      } else {
        this.router.navigate(["/login"])
      }
    })
    this.myform = this.fb.group({
      name: this.fb.control(""),
      password: this.fb.control("")
    })
  }
  submit(form: FormGroup) {
    var status = true;
    var valid = true;
    if (form.value.name == "") {
      this.errname = "! Field is Required";
      status = false;
      valid = false;
    } else {
      this.errname = "";
    } if (form.value.password == "" && valid) {
      this.errpass = "! Field is Required";
      status = false;
      valid = false;
    } else {
      this.errpass = "";
    }
    if (status) {
      this.service.loginuser(form).subscribe((data: any) => {
        console.log(data);
        if (data.token) {
          this.service.setdata(data.token, "token");
          this.service.setdata(form.value.name, "name")
          this.router.navigate(["/home"])
        } else {
          alert(data.message)
        }
      }, err => {
        alert(err.message)
      })
    }
  }
  show() {
    if (this.eye == faEyeSlash) {
      this.eye = faEye;
      this.type = "text";
    }
    else {
      this.eye = faEyeSlash;
      this.type = "password";
    }

  }
}

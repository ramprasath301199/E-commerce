import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
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
export class SignupComponent {
  myform: FormGroup;
  eye = faEyeSlash;
  type = "password";
  errname: string = "";
  errpass: String = "";
  errmobile: String = "";
  erremail: String = "";
  constructor(private fb: FormBuilder, private service: DataService, private router: Router) {
    this.myform = this.fb.group({
      name: new FormControl(""),
      mobile: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(" ")
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
    }
    if (form.value.email == "" && valid) {
      this.erremail = "! Field is Required";
      status = false;
      valid = false;
    } else {
      this.erremail = "";
    }
    if (form.value.mobile == "" && valid) {
      this.errmobile = "! Field is Required";
      status = false;
      valid = false;
    } else {
      this.errmobile = "";
    }
    if (form.value.password == "" && valid) {
      this.errpass = "! Field is Required";
      status = false;
      valid = false;
    } else {
      this.errpass = "";
    }
    if (status) {
      this.service.creaeuser(form).subscribe((data: any) => {
        if (data.message == "suceess")
          this.router.navigate(["/login"])
        else
          alert(data.message)
      }, (err) => {
        alert(err);
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

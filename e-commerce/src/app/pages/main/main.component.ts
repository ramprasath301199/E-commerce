import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatCardModule, MatCardImage } from '@angular/material/card';
import { MatButton } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatCardModule, MatButton, CommonModule, MatCardImage, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() selectedData: any = "";
  @Input() checkbox: any = "";
  _id: any = ""
  allproducts: any;
  // isReadMore: boolean = true;
  readMoreStates: { [key: string]: boolean } = {};
  constructor(private service: DataService, private router: Router) { }
  ngOnInit(): void {
    this.service.getproducts().subscribe((data: any) => {
      console.log(data);
      this.allproducts = data;
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        // alert("Please Login First");
        this.router.navigate(["/login"]);
      }
    })
  }
  trackById(index: number, item: any): string {
    return item._id;
  }
  getcat(cat: any, id: any) {
    this.service.setdata(cat, "category");
    this.service.setdata(id, "id");
  }
}

import { AfterContentInit, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FontAwesomeModule, RouterLink, FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit {
  cart = faCartShopping;
  buy = faBagShopping;
  constructor(private route: ActivatedRoute, private router: Router, private service: DataService) {
    this.loaaData();
  }

  _id: any = "";
  product: any;
  category: any;
  similar: any;
  ngOnInit(): void {

  }
  loaaData() {
    this.route.params.subscribe((data: any) => {
      this._id = data.id;
      this.service.getoneprod(this._id).subscribe(data => {
        this.product = data;
        console.log(this.product);
      }, err => {
        if (err.error == "token expired" || err.error == "No token provided") {
          // alert("Please Login First");
          this.router.navigate(["/login"]);
        }
      })
    })
    this.category = this.service.getdata("category");
    this.service.getproducts().subscribe((data: any) => {
      var prod = data.filter((d: any) => d.category === this.category);
      this.similar = prod.filter((d: any) => d._id != this._id);
      console.log(this.similar)
    })
  }
  getcat(cat: any, id: any) {
    this.service.setdata(cat, "category");
    this.service.setdata(id, "id");
    this.router.navigateByUrl("/home", {
      skipLocationChange: true
    }).then(() => {
      this.router.navigate(["/home/" + id])
    })
  }
  addcart(id: any) {
    this.service.addcart(this.service.getdata("name"), id).subscribe((data: any) => {
      console.log(data);
      if (data.message == "Updated" || data.message == "Success") {
        this.router.navigate(["/cart"])
      }
    }, err => {
      if (err.error == "token expired" || err.error == "No token provided") {
        // alert("Please Login First");
        this.router.navigate(["/login"]);
      }
    })
  }
}

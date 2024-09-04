import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, MatTooltipModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = "";
  cart = faCartShopping;
  logout = faRightFromBracket;
  constructor(private router: Router, private service: DataService) {
  }

  signout() {
    if (confirm("If You Sure Want You Logout"))
      this.router.navigate(["/login"])
    this.service.removedata("token");
    this.service.removedata("name")
  }
}

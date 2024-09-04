import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MainComponent } from '../main/main.component';
import { DataService } from '../../services/data.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MainComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild(SidenavComponent) sidenavComponent!: SidenavComponent;
  selectedData: any = null;
  checkbox: any = null;
  constructor(private service: DataService) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    // Manually update the main component whenever selection changes
    this.selectedData = this.sidenavComponent.selectedValue;
  }

  onSelectionUpdate(): void {
    // Call this method when you need to manually update the data in the main component
    this.selectedData = this.sidenavComponent.selectedValue;
  }
}

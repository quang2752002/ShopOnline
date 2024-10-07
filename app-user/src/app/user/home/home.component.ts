import { Component, OnInit } from '@angular/core';
import { BannerComponent } from 'src/app/layout/banner/banner.component';
import { FeaturesComponent } from 'src/app/layout/features/features.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';


@Component({
  selector: 'app-home',
  standalone:true,
  imports:[
    HeaderComponent,
    BannerComponent,
    FeaturesComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  searchQuery: string = '';
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];
  ngOnInit(): void {
    
  }

}

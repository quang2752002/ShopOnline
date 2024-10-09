import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  searchQuery: string = '';
  index: number = 1;
  size: number = 5;
  totalPages: number = 1;
  pageSizes: number[] = [5, 10, 15, 20];
  ngOnInit(): void {
    
  }
  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.index = 1;
   
  }

}

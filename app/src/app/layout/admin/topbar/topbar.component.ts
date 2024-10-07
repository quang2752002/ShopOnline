import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css',
    './../../../../assets/vendor/fontawesome-free/css/all.min.css',
    './../../../../assets/css/sb-admin-2.min.css']
})
export class TopbarComponent {
  searchQuery: string = ""; // Search query

  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.searchQueryChange.emit(query);
  }
}

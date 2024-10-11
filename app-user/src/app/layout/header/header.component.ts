import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = ""; // Search query
  isSearchVisible: boolean = false; // Controls search input visibility

  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.searchQueryChange.emit(query);
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible; // Toggle search input visibility
  }
}

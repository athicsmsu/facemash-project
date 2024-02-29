import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  static status :any = false;

  constructor(private location: Location){}

  goBack(): void {
		this.location.back();
	}
}

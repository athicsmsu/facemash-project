import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

}

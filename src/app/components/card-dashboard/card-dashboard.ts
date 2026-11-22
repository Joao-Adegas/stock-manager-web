import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  templateUrl: './card-dashboard.html',
  styleUrls: ['./card-dashboard.sass'],
})
export class CardDashboard {
  @Input() title!: string;
  @Input() qtd!: number;
  @Input() description!: string;
}

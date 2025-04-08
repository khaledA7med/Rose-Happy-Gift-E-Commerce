import { Component } from '@angular/core';
import { DeliveryInfoComponent } from '../home/home-main/delivery-info/delivery-info.component';
import * as teamData from '../../../../assets/data/team.json';
import { AboutUsComponent } from '../home/home-main/about-us/about-us.component';
import { AboutInstgramComponent } from './about-instgram/about-instgram.component';
import { TrustCompaniesComponent } from '../home/home-main/trust-companies/trust-companies.component';
import { ReviewsComponent } from '../../../shared/components/ui/reviews/reviews.component';

@Component({
  selector: 'app-about',
  imports: [
    DeliveryInfoComponent,
    AboutUsComponent,
    AboutInstgramComponent,
    TrustCompaniesComponent,
    ReviewsComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  teams: any[] = (teamData as any).default;
}

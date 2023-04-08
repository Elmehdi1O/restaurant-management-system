import { Component } from '@angular/core';
import { Dish } from '../shared/dish';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dish!: Dish;
  promotion!: Promotion;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
  }
}

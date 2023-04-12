import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dish!: Dish;
  promotion!: Promotion;
  leader!:Leader;
  baseURL!:string;
  dishErrMess!: string;
  promoErrMess !:string;
  leaderErrMess !:string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL: string) {
      this.baseURL = BaseURL;
    }

  ngOnInit() {
     this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, dishErrMess => this.dishErrMess = dishErrMess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, promoErrMess => this.promoErrMess = promoErrMess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader, leaderErrMess => this.leaderErrMess = leaderErrMess);
  }
}

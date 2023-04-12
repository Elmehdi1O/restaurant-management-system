import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes!: Dish[];
  baseURL!: string;



  constructor(private dishService: DishService,  @Inject('BaseURL') private BaseURL: string) {
    this.baseURL = BaseURL;
  }
  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

}

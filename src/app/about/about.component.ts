import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/loader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [flyInOut(), expand() ]
})
export class AboutComponent implements  OnInit  {
  leaders!: Leader[];
  baseURL!:string;
  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseRUL: string){
  this.baseURL = this.BaseRUL;
  }
  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(leader => this.leaders = leader);
  }

}

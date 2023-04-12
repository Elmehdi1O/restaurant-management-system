import { Component, Inject, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements  OnInit {
  dish: Dish | undefined;
  dishIds!: string[];
  prev!: string;
  next!: string;
  formComment!: FormGroup
  baseURL!: string;
  formErrors: { [key: string]:  string } = {
    'author': '',
    'comment': '',

  };
  errMess!:string;
  dishcopy: Dish | undefined;
  visibility = 'shown';

  validationMessages: { [key: string]: { [key: string]: string } }  = {
    'author': {
      'required': 'Auther name is required.',
      'minlength': 'Auther name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'comment is required.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL: string) {
      this.baseURL = BaseURL;
     }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params)=>  {  this.visibility = 'hidden'; return this.dishservice.getDish(params['id'])}))
  .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';  }, errMess => this.errMess = errMess);
    this.createFormComment();
  }
  previewShown!:boolean;


  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createFormComment(){
    this.formComment = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5],
      comment: ['', Validators.required]
    })
    this.formComment.statusChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.formComment) { return; }
    const form = this.formComment;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field]= '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
    if(this.formComment.valid){
      this.previewShown = true;
    }
  }

  onSubmit(){
    if (this.formComment.valid) {
      const formCommentValues = this.formComment.value;
      const newComment = new Comment(
        formCommentValues.rating,
        formCommentValues.comment,
        formCommentValues.author,
        new Date().toISOString()
      );
      this.dishcopy?.comments?.push(newComment);
      if(this.dishcopy){
        console.log(this.dishcopy.comments)
        this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = undefined; this.dishcopy = undefined; this.errMess = <any>errmess; });

      }
      this.formComment.reset({
        author: '',
        rating: 5,
        comment: ''
      });
      this.previewShown = false;
    }
  }
}

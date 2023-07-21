import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-upvotes-button-horizontal',
    template: `
    <div 
    (click)="onUpvotesButton()"
    [ngClass]="isClicked ? 'bg-blue' : 'bg-light-blue'" 
    class="upvotes-button flex flex-row items-center px-3 py-2 text-xs rounded-lg">
        <i 
            [ngClass]="isClicked ? 'text-white' : 'text-blue'" 
            class="fa-solid fa-arrow-up">
        </i>
        <p 
            [ngClass]="isClicked ? 'text-white' : 'text-dark-blue'"
            class="pl-2">{{ upvotesDetail.upvotes.length }}
        </p>
    </div>
    `,
    styleUrls: ['./upvotes-button.component.css']
})
export class UpvotesButtonHorizontalComponent implements OnInit {
    @Input() upvotesDetail!: { _id: string, upvotes: string[] };
    isClicked!: boolean;
    userID!: string | null;

    constructor(private productsService: ProductsService, 
        private authService: AuthService) { }

    ngOnInit() {
        this.userID = this.authService.getCurrentUserID();

        this.productsService.getPostById$(this.upvotesDetail._id).pipe(
            map(response => response.feedback.upvotes),
            map(upvotesArr => upvotesArr.includes(this.userID!))).subscribe(isUpvoted => {
                this.isClicked = isUpvoted;
            }
        );
    }


    onUpvotesButton() {
        if (this.authService.getIsAuthenticated()) {

            if (this.isClicked) {
                this.upvotesDetail.upvotes.length -= 1;
                this.productsService.upvotesOnPost(this.upvotesDetail._id, false);
            } else {
                this.upvotesDetail.upvotes.length += 1;
                this.productsService.upvotesOnPost(this.upvotesDetail._id, true);
            }
            
            this.isClicked = !this.isClicked;
        }
    }
}
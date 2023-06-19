import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-comment',
    templateUrl: 'add-comment.component.html',
})
export class AddCommentComponent {

    comment = '';

    onSubmit(commentForm: NgForm) {
        console.log(commentForm);
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
})
export class CommentReplyComponent implements OnInit {
  @Input() author!: string;

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.author = '@' + this.author;
  }

  onCancel() {
    this.commentsService.setReplyComment(null);
  }

  onReply() {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '320px',
      data: { username: this.author },
    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}

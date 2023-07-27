import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../../services/comment.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
})
export class CommentReplyComponent implements OnInit {
  @Input() author!: string;

  constructor(
    private commentService: CommentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.author = '@' + this.author;
  }

  onCancel() {
    this.commentService.setReplyComment(null);
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

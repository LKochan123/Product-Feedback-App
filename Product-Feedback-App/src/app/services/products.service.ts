import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    localFeedbacks: Post[] = [];
    updatedFeedbacks = new Subject<Post[]>();
    private url = 'http://localhost:3000/feedbacks/';

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<{message: string, feedbacks: Post[]}>(this.url);
    }

    getPostById(id: string) {
        return this.http.get<{message: string, feedback: Post}>(this.url + id);
    }

    addPost(title: string, category: string, description: string) {
        const feedback = {
            title: title, 
            category: category,
            upvotes: 0,
            status: 'Planned', 
            description: description
        };

        this.http.post<{message: string}>(this.url, feedback).subscribe(res => {
            console.log(res);
        });
    }

    deletePost(id: string) {
        this.http.delete<{message: string}>(this.url + id).subscribe(res => {
            console.log('Post deleted!');
        })
    }

    // updatePost(id: string, title: string, category: string, status: string, detail: string) {
    //     const feedback = {
    //         title: title, 
    //         category: category,
    //         upvotes: 0,
    //         status: status, 
    //         description: detail
    //     };

    //     this.http.put<{message: string}>(this.url + id, feedback).subscribe(res => {
    //         console.log(res);
    //     })
    // }
}
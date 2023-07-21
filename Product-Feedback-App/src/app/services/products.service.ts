import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryTagEnum } from '../models/enums/category-tag';
import { environemnt } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    feedbacks$ = new Subject<Post[]>();
    private url = environemnt.apiUrl + 'feedbacks/';

    constructor(private http: HttpClient, private router: Router) { }

    getPostsUpdate$(): Observable<Post[]> {
        return this.feedbacks$.asObservable();
    }

    getPosts() {
        return this.http.get<{message: string, feedbacks: Post[], occurance: number}>(this.url);
    }

    getPostsByStatus$(status: string) {
        const queryParams = `?status=${status}`
        return this.http.get<{message: string, feedbacks: Post[], occurance: number}>
        (this.url +  'status' + queryParams);
    }

    getPostById$(id: string) {
        return this.http.get<{message: string, feedback: Post}>(this.url + id);
    }

    addPost(title: string, category: CategoryTagEnum, description: string) {
        const feedback = {
            title: title, 
            category: category,
            upvotes: 0,
            status: 'Suggestion', 
            description: description
        };

        this.http.post<{message: string}>(this.url, feedback).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    deletePost$(id: string) {
        return this.http.delete<{message: string}>(this.url + id);
    }

    updatePost(id: string, title: string, category: CategoryTagEnum, status: string, detail: string) {
        const feedback = {
            title: title, 
            category: category,
            status: status, 
            description: detail
        };

        this.http.patch<{message: string}>(this.url + id, feedback).subscribe(() => {
            this.navigateByStatus(status);
        })
    }

    upvotesOnPost(id: string, upvote: boolean) {
        const isUpvoted = {
            upvote: upvote,
            downvote: !upvote
        }
        this.http.patch<{message: string}>(this.url + 'upvotes/' + id, isUpvoted).subscribe();
    }

    navigateByStatus(status: string) {
        this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
    }
}
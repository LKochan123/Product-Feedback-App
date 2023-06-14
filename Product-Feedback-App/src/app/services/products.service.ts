import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    feedbacks$ = new Subject<Post[]>();
    private url = 'http://localhost:3000/feedbacks/';

    constructor(private http: HttpClient, private router: Router) { }

    getPostsUpdate$(): Observable<Post[]> {
        return this.feedbacks$.asObservable();
    }

    getPosts() {
        this.http.get<{message: string, feedbacks: Post[], occurance: number}>(this.url)
        .subscribe(response => {
            this.feedbacks$.next([...response.feedbacks]);
        })
    }

    getPostsByStatus$(status: string) {
        const queryParams = `?status=${status}`
        return this.http.get<{message: string, feedbacks: Post[], occurance: number}>
        (this.url +  'status' + queryParams);
    }

    getPostById$(id: string) {
        return this.http.get<{message: string, feedback: Post}>(this.url + id);
    }

    addPost(title: string, category: string, description: string) {
        const feedback = {
            title: title, 
            category: category,
            upvotes: 0,
            status: 'Suggestion', 
            description: description
        };

        this.http.post<{message: string}>(this.url, feedback).subscribe(res => {
            this.router.navigate(['/']);
        });
    }

    deletePost$(id: string) {
        return this.http.delete<{message: string}>(this.url + id);
    }

    updatePost(id: string, title: string, category: string, status: string, detail: string) {
        const feedback = {
            title: title, 
            category: category,
            upvotes: 0,
            status: status, 
            description: detail
        };

        this.http.patch<{message: string}>(this.url + id, feedback).subscribe(res => {
            this.navigateByStatus(status);
        })
    }

    navigateByStatus(status: string) {
        this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
    }
}
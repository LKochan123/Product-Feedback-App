import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    posts = new Subject<Post[]>();
    private _url = 'http:localhost:3000';

    postsArr = [
        {
            id: 1,
            title: 'Fetchind data',
            category: 'UI',
            upvotes: 11,
            status: 'Planned',
            description: 'Short description example data bla bla bal bla',
            comments: []
        }
    ]

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<Post[]>(this._url);
    }
}
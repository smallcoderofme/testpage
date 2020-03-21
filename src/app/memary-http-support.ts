import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts, Post, Tags } from './data';

@Injectable({
	providedIn: 'root'
})

export class MemaryHttpSupport {
	
	constructor() {
		
	}

	signIn() {

	}

	signOut() {

	}

	getPosts(): Observable<any> {
		return new Observable(subscriber => {
			subscriber.next(Posts);
			subscriber.complete();
		});
	}

	getPost(): Observable<any> {
		return new Observable(subscriber => {
			subscriber.next(Post);
			subscriber.complete();
		});
	}

	deletePost(postId: string): Observable<any> {
		return new Observable(subscriber => {
			subscriber.next(Post);
			subscriber.complete();
		});
	}

	getTags(): Observable<any> {
		return new Observable(subscriber => {
			subscriber.next(Tags);
			subscriber.complete();
		});
	}

	addTag(tag): Observable<any> {
		return new Observable(subscriber => {
			/**
			* verify repeat tag name
			**/
			subscriber.next(Tags.push(tag));
			subscriber.complete();
		}); 
	}

	removeTag(tagId): Observable<any> {
		return new Observable(subscriber => {
			const len = Tags.length - 1;
			for (var i = len; i >= 0; i--) {
				if(Tags[i].id === tagId) {
					Tags.splice(i, 1);
					break;
				}
			}
			subscriber.next(Tags);
			subscriber.complete();
		}); 
	}
}


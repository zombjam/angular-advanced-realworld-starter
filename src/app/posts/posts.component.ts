import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Article } from '../interfaces/article';
import { Articles } from '../interfaces/articles';
import { PostService } from '../post.service';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  articles: Article[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getArticles()
      .pipe(map((response: Articles) => response.articles))
      .subscribe((data) => {
        this.articles = data;
      });
  }
}

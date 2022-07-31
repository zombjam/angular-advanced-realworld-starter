import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { PostService } from 'src/app/post.service';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  article?: Article | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.postService
          .getArticle(id)
          .pipe(map((response) => response.article))
          .subscribe((article) => {
            this.article = article;
            console.log('article: ', article);
          });
      }
    });
  }
}

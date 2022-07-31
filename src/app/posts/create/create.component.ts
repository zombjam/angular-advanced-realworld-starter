import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateArticle } from 'src/app/interfaces/create-article';
import { PostService } from 'src/app/post.service';

const bodyValidators = Validators.compose([
  Validators.required,
  Validators.minLength(10),
]);

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    title: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
    description: this.fb.control<string>(''),
    body: this.fb.control<string>(''),
    tagList: this.fb.array<string>(['programming', 'javascript', 'webdev']),
  });

  tag = '';

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 動態更新驗證器
    this.form.controls.title.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.form.controls.body.addValidators(bodyValidators ?? []);
        this.form.controls.body.updateValueAndValidity();
      } else if (status === 'INVALID') {
        this.form.controls.body.removeValidators(bodyValidators ?? []);
        this.form.controls.body.updateValueAndValidity();
      }
    });
  }

  createPost() {
    if (this.form.valid) {
      this.postService
        .createArticle(this.form.value as CreateArticle)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  addTag(event: Event) {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    this.form.controls.tagList.push(this.fb.control(value));
    this.tag = '';
  }

  removeTag(index: number) {
    this.form.controls.tagList.removeAt(index);
  }

  isInvalid(f: FormGroupDirective, ctrlName: string) {
    const ctrl = this.form.get(ctrlName);
    return ctrl?.invalid && (ctrl?.touched || f.submitted);
  }
}

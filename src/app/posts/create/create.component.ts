import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateArticle } from 'src/app/interfaces/create-article';
import { PostService } from 'src/app/post.service';

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
    body: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    tagList: this.fb.array<string>(['programming', 'javascript', 'webdev']),
  });

  tag = '';

  get tagList() {
    return this.form.get('tagList') as FormArray<FormControl<string | null>>;
  }

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    this.tagList.push(this.fb.control(value));
    this.tag = '';
  }

  removeTag(index: number) {
    this.tagList.removeAt(index);
  }

  isInvalid(f: FormGroupDirective, ctrlName: string) {
    const ctrl = this.form.get(ctrlName);
    return ctrl?.invalid && (ctrl?.touched || f.submitted);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { DataService } from '../services/data.service';
import { PostModel } from '../models/post.model';

@Component({
  selector: 'app-discovery',
  templateUrl: 'discovery.page.html',
  styleUrls: ['discovery.page.scss']
})
export class DiscoveryPage implements OnInit {

  public selectedImage: string | ArrayBuffer | null = null;
  public posts: PostModel[] = [];

  constructor(public userService: UserService, public postService: PostService, private _data: DataService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: response => {
        this.posts = response;
      },
      error: error => {
        this._data.showToast('Oops, something went wrong with getting posts!', 'danger');
      }
    })
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.postService.postForm.patchValue({ image: file });
      this.postService.postForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        console.log(this.selectedImage)
      };
      reader.readAsDataURL(file);
    }
  }

  public removeSelectedImage(): void {
    this.selectedImage = null;
    this.postService.postForm.patchValue({ image: null });
    this.postService.postForm.get('image')?.updateValueAndValidity();
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  public submitPost(): void {
      const formData = new FormData();
      for (const key in this.postService.postForm.value) {
        formData.append(key, this.postService.postForm.value[key]);
      }
      this.postService.submitPost(formData).subscribe({
        next: response => {
          this.postService.postForm.reset();
          this.removeSelectedImage();
          this._data.showToast('Post has been shared successfully', 'success');
        },
        error: error => {
          this._data.showToast('Oops, something went wrong.', 'danger');
        }
      });
  }

}

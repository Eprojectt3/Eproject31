import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss'],
})
export class CreateTourComponent implements OnInit {
  loginForm!: FormGroup;
  hotels!: any;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  formData: FormData = new FormData();
  dataForm: any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

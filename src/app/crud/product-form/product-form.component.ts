import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  // @ts-ignore
  productForm: FormGroup;

  constructor(private crudService : CRUDService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(250)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])]
    });
  }
}

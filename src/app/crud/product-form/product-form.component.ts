import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private formBuilder: FormBuilder,
              private router: Router
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

  createProduct(values: any, isUpdate: boolean = false) {
    console.log(values);
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (isUpdate) {
      //PARA ACTUALIZAR UN PRODUCTO
    }else{
      this.crudService.createProduct(formData).subscribe(res=>{
        if(res.result === 'success') {
          this.router.navigate(['/crud/product-list']);
        }
      });

    }
  }
}

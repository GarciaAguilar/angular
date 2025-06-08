import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  // @ts-ignore
  productForm: FormGroup;
  productId: any;
  buttonText = 'Crear Producto';

  constructor(private crudService: CRUDService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    let productId = '';
    if (this.activatedRoute.snapshot.params['productoId']) {
      productId = this.activatedRoute.snapshot.params['productoId'];
      if (productId !== '') {
        this.loadProductDetails(productId);

      }
    }
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(250)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])]
    });
  }

  createProduct(values: any) {
    console.log(values);
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (this.productId) {
      //Para editar un producto
      formData.append('id', this.productId);
      this.crudService.editProduct(formData).subscribe(res => {
        if (res.result === 'success') {
          this.navigateTo('/crud/product-list');
          //this.router.navigate(['/crud/product-list']);
        }
      });
    } else {
      this.crudService.createProduct(formData).subscribe(res => {
        if (res.result === 'success') {
          this.navigateTo('/crud/product-list');
          //this.router.navigate(['/crud/product-list']);
        }
      });

    }
  }

  loadProductDetails(productId: any) {
    this.buttonText = 'Actualizar Producto';
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['name'].setValue(res.p_name);
      this.productForm.controls['description'].setValue(res.p_description);
      this.productForm.controls['price'].setValue(res.p_price);
      this.productId = res.p_id;
    });
  }

  navigateTo(route: any){
    this.router.navigate([route]);
  }
}

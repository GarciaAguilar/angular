import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRUDService } from 'src/app/services/crud.service';
import { Product } from '../models/product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  //@ts-ignore
  detalleProducto: Product;

  constructor(private crudService: CRUDService,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let productId = '';
    if (this.activatedRoute.snapshot.params['productoId']) {
      productId = this.activatedRoute.snapshot.params['productoId'];
      if (productId !== '') {
        this.loadProductDetails(productId);

      }
    }
  }

  loadProductDetails(productId: any) {
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.detalleProducto = res;
    });
  }

}

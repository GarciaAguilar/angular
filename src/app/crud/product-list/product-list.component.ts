import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs = [
    {field: 'p_name', headerName: 'Nombre Producto', sortable: true, headerClass: 'header-cell'},
    {field: 'p_description', headerName: 'Descripción', sortable: true, headerClass: 'header-cell'},
    {field: 'p_price', headerName: 'Precio', sortable: true, headerClass: 'header-cell'},
    {field: '', headerName: 'Acciones', sortable: true, headerClass: 'header-cell', 
      width: 300, cellRenderer: this.actionRender},
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  productList: any = [];
  productListSuscribe: any;

  constructor(private crudService : CRUDService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productListSuscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
      this.rowData = res;
    });
  }

  actionRender(params: any) {
    return `<button class="btn btn-primary" (click)="verProduct(${params.data.p_id})">Ver</button>
            <button class="btn btn-warning" (click)="editProduct(${params.data.p_id})">Editar</button>
            <button class="btn btn-danger" (click)="deleteProduct(${params.data.p_id})">Eliminar</button>`;
  }
}

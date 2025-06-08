import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { CRUDService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs = [
    { field: 'p_name', headerName: 'Nombre Producto', sortable: true, headerClass: 'header-cell' },
    { field: 'p_description', headerName: 'Descripción', sortable: true, headerClass: 'header-cell' },
    { field: 'p_price', headerName: 'Precio', sortable: true, headerClass: 'header-cell', cellRenderer: this.priceCellRender.bind(this) },
    {
      field: '', headerName: 'Acciones', sortable: true, headerClass: 'header-cell',
      width: 300, cellRenderer: this.actionRender.bind(this)
    },
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  productList: any = [];
  productListSuscribe: any;

  constructor(private crudService: CRUDService,
    private router: Router
  ) { }

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
    let div = document.createElement('div');
    let html = `<button type="button" class="btn btn-primary">Ver</button>
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger">Eliminar</button>`;
    div.innerHTML = html;

    //Seleecionar boton ver
    let viewButton = div.querySelector('.btn-primary');
    viewButton?.addEventListener('click', () => {
      this.viewProductDetails(params);
    })

    //Seleccionar boton editar
    let editButton = div.querySelector('.btn-warning');
    editButton?.addEventListener('click', () => {
      this.editProductDetails(params);
    })

    //Seleccionar boton eliminar
    let deleteButton = div.querySelector('.btn-danger');
    deleteButton?.addEventListener('click', () => {
      this.deleteProduct(params);
    })

    return div;
  }

  viewProductDetails(params: any) {
    this.router.navigate(['/crud/view-product-details/' + params.data.p_id]);
  }

  editProductDetails(params: any) {
    this.router.navigate(['/crud/update-product/' + params.data.p_id]);
  }

  deleteProduct(params: any) {
    const that = this;
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        that.crudService.deleteProduct(params.data.p_id).subscribe(res => {
          if (res.result === 'success') {
            this.getProductList();
            Swal.fire({
              title: "Eliminado!",
              text: "El producto ha sido eliminado.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  priceCellRender(params: any) {
    return '$ ' + params.data.p_price;
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRUDRoutingModule } from './crud-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    CRUDRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CRUDModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './crud/product-list/product-list.component';
import { ProductFormComponent } from './crud/product-form/product-form.component';
import { ProductDetailsComponent } from './crud/product-details/product-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'crud', pathMatch: 'full'},
  {path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CRUDModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { HttpResponse } from '../crud/models/http-response';
import { Product } from '../crud/models/product';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient : HttpClient) { }
  
  loadProducts() {
    const url = environment.API_EndPoint + 'listar.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }
/*loadProducts(): Observable<Product[]> {  // Cambiado a Observable<Product[]>
    const url = environment.API_EndPoint + 'listar.php';
    
    return this.httpClient.get<HttpResponse>(url).pipe(
      map(response => {
        if (response.result === 'success') {
          // Asegúrate de que response.data existe y es un array
          return response.data || [];
        }
        throw new Error(response.message || 'Error desconocido');
      }),
      catchError(error => {
        console.error('Error al cargar productos:', error);
        throw error;
      })
    );
  }*/

  //Metodo para crear un producto
 
  createProduct(formData: FormData): Observable<HttpResponse> {
    const url = environment.API_EndPoint + 'crear.php';
    return this.httpClient.post<HttpResponse>(url, formData);
  }


  loadProductInfo(productId: any): Observable<Product> {
    const url = environment.API_EndPoint + 'view_one.php?id=' + productId;
    return this.httpClient.get<Product>(url).pipe(map(data => data));
  }
  
  editProduct(data: any): Observable<HttpResponse> {
    const url = environment.API_EndPoint + 'actualizar.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  deleteProduct(productId: any): Observable<HttpResponse> {
    const url = environment.API_EndPoint + 'delete.php?id=' + productId;
    return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpResponse } from '../crud/models/http-response';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient : HttpClient) { }
  
  loadProducts() {
    const url = environment.API_EndPoint + 'view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  //Metodo para crear un producto
 
  createProduct(formData: FormData): Observable<HttpResponse> {
    const url = environment.API_EndPoint + 'create.php';
    return this.httpClient.post<HttpResponse>(url, formData);
  }


  /*editProduct(product: any) {
    const url = environment.API_EndPoint + 'update.php';
    return this.httpCLient.post(url, product).pipe(map(data => data));
  }*/
}

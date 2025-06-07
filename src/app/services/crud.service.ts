import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpCLient : HttpClient) { }
  
  loadProducts() {
    const url = environment.API_EndPoint + 'view.php';
    return this.httpCLient.get(url).pipe(map(data => data));
  }

  /*editProduct(product: any) {
    const url = environment.API_EndPoint + 'update.php';
    return this.httpCLient.post(url, product).pipe(map(data => data));
  }*/
}

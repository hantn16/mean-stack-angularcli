import { Injectable } from '@angular/core';
import { Seller } from '../../core/domain/seller.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  delayMs = 500;
  constructor() { }
    // Fake server get; assume nothing can go wrong
    getSellers(): Observable<Seller[]> {
      return of(sellers).pipe(delay(this.delayMs)); // simulate latency with delay
    }
  
    // Fake server update; assume nothing can go wrong
    updateSeller(seller: Seller): Observable<Seller>  {
      const oldSeller = sellers.find(h => h.id === seller.id);
      const newSeller = Object.assign(oldSeller, seller); // Demo: mutate cached seller
      return of(newSeller).pipe(delay(this.delayMs)); // simulate latency with delay
    }
}

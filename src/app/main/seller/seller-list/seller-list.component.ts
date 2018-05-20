import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerModel } from '../../../core/domain/seller.model';
import { SellerService } from '../seller.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {

  sellers: Observable<SellerModel[]>;
  isLoading = false;
  selectedSeller: SellerModel;

  constructor(private sellerService: SellerService) { }

  ngOnInit() { this.getSelleres(); }

  getSelleres() {
    this.isLoading = true;
    this.sellers = this.sellerService.getSelleres()
      // TODO: error handling
      .pipe(finalize(() => this.isLoading = false));
    this.selectedSeller = undefined;
  }

  select(seller: SellerModel) { this.selectedSeller = seller; }
}

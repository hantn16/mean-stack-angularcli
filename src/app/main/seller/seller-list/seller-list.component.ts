import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerModel } from '../../../core/domain/seller.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SellerService } from '../seller.service';
import { finalize } from 'rxjs/operators';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {

  sellers;
  isLoading = false;
  selectedSeller: SellerModel;

  constructor(private _sellerService: SellerService) { }

  ngOnInit() { this.getSellers(); }

  getSellers() {
    this.isLoading = true;
    this.sellers = this._sellerService.getSellers();
    this.selectedSeller = undefined;
    this.isLoading = false;
  }

  select(seller: SellerModel) { this.selectedSeller = seller; }
}

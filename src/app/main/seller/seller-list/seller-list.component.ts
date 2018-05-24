import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerModel } from '../../../core/domain/seller.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SellerService } from '../seller.service';
import { finalize, map } from 'rxjs/operators';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {

  sellers = [];
  isLoading = false;
  selectedSeller;

  constructor(private _dataService: DataService) { }

  ngOnInit() { this.getSellers(); }

  getSellers() {
    this.isLoading = true;
    this._dataService.get('sellers/getall').subscribe(
      (res) => {
        console.log(res);
        this.sellers = res.sellers;
      }, err => console.log(err)
      , () => this.isLoading = false);
    this.selectedSeller = undefined;
  }
  select(seller) { this.selectedSeller = seller; }
  addSeller() {
    this.selectedSeller = {
      commonName: '',
      companyName: '',
      taxCode: '',
      address: ''
    };
  }
}

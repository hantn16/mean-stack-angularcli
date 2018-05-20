import { Injectable } from '@angular/core';
import { SellerModel } from '../../core/domain/seller.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';
import { SystemConstants } from '../../core/common/system.constants';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


  constructor(private _dataService: DataService) { }
  getSelleres(): any {
    return this._dataService.get('/sellers/getall');
  }
}

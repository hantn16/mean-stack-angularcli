import { Component, OnChanges, Input } from '@angular/core';
import { SellerModel } from '../../../core/domain/seller.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SellerService } from '../seller.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnChanges {
  @Input() seller;

  sellerForm: FormGroup;
  nameChangeLog: string[] = [];
  // states = states;

  constructor(
    private fb: FormBuilder,
    private _sellerService: SellerService,
    private _notificationService: NotificationService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.sellerForm = this.fb.group({
      _id: '',
      commonName: '',
      companyName: '',
      taxCode: '',
      address: ''
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.sellerForm.reset({
      _id: this.seller._id,
      commonName: this.seller.commonName,
      companyName: this.seller.companyName,
      taxCode: this.seller.taxCode,
      address: this.seller.address
    });
    // this.setAddresses(this.seller.addresses);
  }

  onSubmit() {
    this.seller = this.prepareSaveSeller();
    const updatedSeller = this._sellerService.updateSeller(this.seller);
    this._notificationService.printSuccessMessage(updatedSeller.commonName + 'has been updated successfully!!!');
    this.rebuildForm();
  }

  prepareSaveSeller() {
    const formModel = this.sellerForm.value;
    const saveSeller = {
      _id: formModel._id as string,
      commonName: formModel.commonName as string,
      companyName: formModel.companyName as string,
      taxCode: formModel.taxCode as string,
      address: formModel.address as string
    };
    return saveSeller;
  }

  revert() { this.rebuildForm(); }
  logNameChange() {
    const nameControl = this.sellerForm.get('commonName');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}

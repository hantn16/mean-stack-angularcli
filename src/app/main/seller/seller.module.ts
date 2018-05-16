import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule
  ],
  declarations: [SellerComponent, SellerListComponent, SellerDetailComponent]
})
export class SellerModule { }

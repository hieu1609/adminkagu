import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdvertisementManagementRoutingModule } from "./advertisement-management-routing.module";
import { AdvertisementManagementComponent } from "./advertisement-management.component";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [AdvertisementManagementComponent, ModalImageComponent],
  exports: [AdvertisementManagementComponent],
  imports: [
    CommonModule,
    AdvertisementManagementRoutingModule,
    FormsModule,
    MDBBootstrapModule
  ]
})
export class AdvertisementManagementModule {}

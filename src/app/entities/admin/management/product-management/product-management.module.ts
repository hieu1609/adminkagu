import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductManagementRoutingModule } from "./product-management-routing.module";
import { ProductManagementComponent } from "./product-management.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProductManagementComponent],
  exports: [ProductManagementComponent],
  imports: [CommonModule, ProductManagementRoutingModule, FormsModule]
})
export class ProductManagementModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderManagementRoutingModule } from "./order-management-routing.module";
import { OrderManagementComponent } from "./order-management.component";
import { FormsModule } from "@angular/forms";
import { ConfirmOrderComponent } from "./confirm-order/confirm-order.component";

import { NewOrderComponent } from "./new-order/new-order.component";
import { ShippingOrderComponent } from "./shipping-order/shipping-order.component";

import { CompletedOrderComponent } from "./completed-order/completed-order.component";

@NgModule({
  declarations: [
    OrderManagementComponent,
    ConfirmOrderComponent,
    NewOrderComponent,
    ShippingOrderComponent,

    CompletedOrderComponent
  ],
  exports: [OrderManagementComponent],
  imports: [CommonModule, OrderManagementRoutingModule, FormsModule]
})
export class OrderManagementModule {}

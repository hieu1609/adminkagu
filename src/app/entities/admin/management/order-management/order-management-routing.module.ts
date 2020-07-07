import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderManagementComponent } from "./order-management.component";
import { ConfirmOrderComponent } from "./confirm-order/confirm-order.component";
import { NewOrderComponent } from "./new-order/new-order.component";
import { ShippingOrderComponent } from "./shipping-order/shipping-order.component";
import { CompletedOrderComponent } from "./completed-order/completed-order.component";

const routes: Routes = [
  {
    path: "",
    component: OrderManagementComponent,
    children: [
      { path: "new", component: NewOrderComponent },

      { path: "confirmed", component: ConfirmOrderComponent },
      { path: "shipping", component: ShippingOrderComponent },
      { path: "completed", component: CompletedOrderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule {}

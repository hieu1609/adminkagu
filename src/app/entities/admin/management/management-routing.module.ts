import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagementComponent } from "./management.component";

const routes: Routes = [
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: "dashboard",
        loadChildren:
          "./admin-dashboard/admin-dashboard.module#AdminDashboardModule"
      },
      {
        path: "users-management",
        loadChildren:
          "./user-management/user-management.module#UserManagementModule"
      },
      {
        path: "advertisement-management",
        loadChildren:
          "./advertisement-management/advertisement-management.module#AdvertisementManagementModule"
      },
      {
        path: "product-management",
        loadChildren:
          "./product-management/product-management.module#ProductManagementModule"
      },
      {
        path: "order-management",
        loadChildren:
          "./order-management/order-management.module#OrderManagementModule"
      },
      {
        path: "message-management",
        loadChildren:
          "./message-management/message-management.module#MessageManagementModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}

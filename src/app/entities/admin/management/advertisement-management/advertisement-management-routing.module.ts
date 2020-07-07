import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdvertisementManagementComponent } from "./advertisement-management.component";

const routes: Routes = [
  {
    path: "",
    component: AdvertisementManagementComponent,
    children: [{ path: "", component: AdvertisementManagementComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementManagementRoutingModule {}

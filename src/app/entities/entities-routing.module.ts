import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./../common/guards/auth.guard";

const routes: Routes = [
  { path: "", loadChildren: "./admin/admin.module#AdminModule" },
  {
    path: "accept/reset-password/:token",
    loadChildren: "./reset-password/reset-password.module#ResetPasswordModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule {}

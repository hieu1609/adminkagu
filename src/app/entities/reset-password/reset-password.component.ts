import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataService } from "src/app/shared/data.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  @ViewChild("formReset", { static: false }) formReset: NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this._getParamsFromURL();
  }
  _getParamsFromURL() {
    this.token = this.activatedRoute.snapshot.paramMap.get("token");
    console.log(this.token);
  }
  ConfirmResetPassword() {
    let objReset = {
      token: this.token,
      newPassword: this.formReset.value.newPassword,
      confirmNewPassword: this.formReset.value.confirmNewPassword
    };
    console.log(this.formReset);

    console.log(objReset);

    const uri = `auth/accept/reset-password`;
    this._dataService.post(uri, objReset).subscribe(
      (data: any) => {
        alert(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

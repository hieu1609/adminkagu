import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"]
})
export class UserManagementComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  userList: any = [];
  idUserEdit;
  totalPage: any = [];
  currentPage;
  editflag: boolean = false;
  ngOnInit() {
    this.getAllUsers(1);
  }
  getAllUsers(page) {
    const uri = `admin/get-user-admin`;
    let message = {
      page
    };
    this.currentPage = page;
    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.userList = data.data.data;
        if (this.userList.length === 0 && page !== 1) {
          this.getAllUsers(page - 1);
        }
        console.log(data.data.numPage);
        let i = 1;
        this.totalPage = [];
        while (i <= data.data.numPage) {
          this.totalPage.push(i);
          i++;
        }
        console.log(this.totalPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteUser(item) {
    const uri = `admin/${item.id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllUsers(this.currentPage);
      },
      (err: any) => {
        console.log(err);
        alert(err.error.errors[0].errorMessage);
      }
    );
  }
  EditUser(item) {
    console.log(item);
    this.editflag = true;
    this.idUserEdit = item.id;
    this.formEdit.setValue({
      email: item.email,
      name: item.name,
      phone: item.phone,
      address: item.address,
      admin: item.admin
    });
    this.editflag = true;
    console.log(this.formEdit.value);
  }
  AddUser() {}

  _handleOnSubmitEditForm() {
    console.log(this.formEdit.value);
    const uri = `admin/${this.idUserEdit}`;
    this._dataService.put(uri, this.formEdit.value).subscribe(
      (data: any) => {
        this.getAllUsers(this.currentPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  _handleOnSubmitAddForm() {
    console.log(this.formSignUp.value);
    const uri = "admin/add-user";
    this._dataService.post(uri, this.formSignUp.value).subscribe(
      (data: any) => {
        this.getAllUsers(this.currentPage);
        this.formSignUp.resetForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

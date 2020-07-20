import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.component.html",
  styleUrls: ["./confirm-order.component.scss"],
})
export class ConfirmOrderComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  ordertList: any = [];
  productsList: any = [];
  idProductEdit;
  totalPage: any = [];
  currentPage;
  times = 1;
  orderID;
  editflag: boolean = false;
  editOrderObj: any = {
    orderId: 0,
    productId: 0,
    productName: "string",
    productPrice: 0,
    quantity: 0,
    status: "string",
  };
  ngOnInit() {
    this.getAllOrder(1);
    if (sessionStorage.getItem("productsList")) {
      this.productsList = JSON.parse(sessionStorage.getItem("productsList"));
    }
  }

  getAllProduct() {
    const uri = `admin/getAllProductAdmin`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        for (let item of data.data) {
          this.productsList.push(item);
        }
        sessionStorage.setItem(
          "productsList",
          JSON.stringify(this.productsList)
        );

        console.log(this.productsList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllOrder(page) {
    const uri = `admin/get-confirmed-order-admin`;
    let message = {
      page,
    };
    this.currentPage = page;

    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.ordertList = data.data.data;

        if (this.ordertList.length === 0 && page !== 1) {
          this.getAllOrder(page - 1);
        }

        let i = 1;
        this.totalPage = [];
        console.log(data.data.numPage);

        while (i <= data.data.numPage) {
          this.totalPage.push(i);
          i++;
          console.log(i);
        }

        console.log(this.totalPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteOrder(id) {
    console.log(id);
    const uri = `admin/order/${id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
      },
      (err: any) => {
        alert(err.error.errors[0].errorMessage);
      }
    );
  }
  EditProduct(item) {
    console.log(item);
    this.editflag = true;
    this.idProductEdit = item.id;
    this.orderID = item.order_id;
    this.formEdit.setValue({
      productId: item.product_id,
      productName: item.product_name,
      productPrice: item.product_price,
      quantity: item.quantity,
      status: item.status,
    });
    this.editflag = true;
    console.log(this.formEdit.value);
  }

  _handleOnSubmitEditForm() {
    console.log(this.formEdit.value);
    this.editOrderObj.orderId = this.orderID;
    this.editOrderObj.productId = this.formEdit.value.productId;
    this.editOrderObj.productName = this.formEdit.value.productName;
    this.editOrderObj.productPrice = this.formEdit.value.productPrice;
    this.editOrderObj.quantity = this.formEdit.value.quantity;

    if (
      this.formEdit.value.status === 0 ||
      this.formEdit.value.status === "0"
    ) {
      this.editOrderObj.status = "none";
    } else if (
      this.formEdit.value.status === "1" ||
      this.formEdit.value.status === 1
    ) {
      this.editOrderObj.status = "shipping";
    } else {
      this.editOrderObj.status = "finished";
    }
    console.log(this.editOrderObj);

    const uri = `admin/order/${this.idProductEdit}`;

    this._dataService.put(uri, this.editOrderObj).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  _handleOnSubmitAddForm() {
    console.log(this.formSignUp.value);
    const uri = "admin/addProduct";
    this._dataService.post(uri, this.formSignUp.value).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
        this.formSignUp.resetForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

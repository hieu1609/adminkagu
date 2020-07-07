import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-order-management",
  templateUrl: "./order-management.component.html",
  styleUrls: ["./order-management.component.scss"]
})
export class OrderManagementComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  productList: any = [];
  categoriesList: any = [];
  idProductEdit;
  totalPage: any = [];
  currentPage;
  productsList: any = [];

  editflag: boolean = false;
  ngOnInit() {
    // this.getAllProduct(1);
    // this.getAllCategories();
    console.log("order component");
    this.getAllProduct();
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
  getAllCategories() {
    const uri = `data/getProductCategory`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        this.categoriesList = data.data;
        console.log(this.productList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

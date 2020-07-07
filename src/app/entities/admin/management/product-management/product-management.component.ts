import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"]
})
export class ProductManagementComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  productList: any = [];
  categoriesList: any = [];
  idProductEdit;
  totalPage: any = [];
  currentPage;

  editflag: boolean = false;
  ngOnInit() {
    this.getAllProduct(1);
    // this.getAllCategories();
  }

  // getAllCategories() {
  //   const uri = `admin/get-product-admin`;

  //   this._dataService.get(uri).subscribe(
  //     (data: any) => {
  //       this.categoriesList = data.data;
  //       console.log(this.productList);
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }
  getAllProduct(page) {
    const uri = `admin/get-product-admin`;
    let message = {
      page
    };
    this.currentPage = page;
    console.log(this.currentPage);

    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.productList = data.data.data;
        console.log(this.productList);
        if (this.productList.length === 0 && page !== 1) {
          this.getAllProduct(page - 1);
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
  DeleteProduct(item) {
    const uri = `admin/product/${item.id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllProduct(this.currentPage);
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
    this.formEdit.setValue({
      productName: item.product_name,
      productPrice: item.price,
      productImage: item.product_image,
      description: item.description,
      categoryId: item.category_id
    });
    this.editflag = true;
    console.log(this.formEdit.value);
  }

  _handleOnSubmitEditForm() {
    console.log(this.formEdit.value);
    const uri = `admin/product/${this.idProductEdit}`;
    this._dataService.put(uri, this.formEdit.value).subscribe(
      (data: any) => {
        this.getAllProduct(this.currentPage);
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
        this.getAllProduct(this.currentPage);
        this.formSignUp.resetForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

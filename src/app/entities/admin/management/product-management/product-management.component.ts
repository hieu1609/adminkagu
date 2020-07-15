import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"],
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
    this.getAllCategories();
  }

  getAllCategories() {
    const uri = `data/get-product-category`;
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
  getAllProduct(page) {
    const uri = `admin/get-product-admin`;
    let message = {
      page,
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
    const uri = `admin/product/${item.product_id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllProduct(this.currentPage);
      },
      (err: any) => {
        //alert(err.error.errors[0].errorMessage);
        console.log(err);
      }
    );
  }
  EditProduct(item) {
    console.log(item);
    this.editflag = true;
    this.idProductEdit = item.product_id;
    this.formEdit.setValue({
      productName: item.product_name,
      productFkPrice: item.product_fk_price,
      productPrice: item.product_price,
      productMaterial: item.material,
      productSize: item.size,
      productColor: item.color,
      tag: item.tag,
      infor: item.infor,
      categoryId: item.cat_id,
      rating: item.rating,
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
    const uri = "admin/add-product";
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

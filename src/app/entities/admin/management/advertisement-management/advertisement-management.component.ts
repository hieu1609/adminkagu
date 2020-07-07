import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-advertisement-management",
  templateUrl: "./advertisement-management.component.html",
  styleUrls: ["./advertisement-management.component.scss"]
})
export class AdvertisementManagementComponent implements OnInit {
  constructor(private _dataService: DataService, private router: Router) {}
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  adsList: any = [];
  idAdsEdit;
  totalPage: any = [];
  currentPage;
  ngOnInit() {
    this.getAllAds(1);
  }
  getAllAds(page) {
    this.currentPage = page;
    const uri = `admin/get-slide-show-a dmin`;
    let message = {
      page
    };
    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.adsList = data.data.data;
        if (this.adsList.length === 0 && page !== 1) {
          this.getAllAds(page - 1);
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
  EditAds(item) {
    console.log(item);

    this.idAdsEdit = item.id;
    this.formEdit.setValue({
      title: item.title,
      image: item.image
    });

    console.log(this.formEdit.value);
  }
  _handleOnSubmitEditForm() {
    console.log(this.formEdit.value);
    const uri = `admin/slideshow/${this.idAdsEdit}`;
    this._dataService.put(uri, this.formEdit.value).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteAds(item) {
    this.idAdsEdit = item.id;
    const uri = `admin/slideshow/${this.idAdsEdit}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  _handleOnSubmitAddForm() {
    console.log(this.formSignUp.value);
    const uri = "admin/addSlideShow";
    this._dataService.post(uri, this.formSignUp.value).subscribe(
      (data: any) => {
        this.getAllAds(this.currentPage);
        this.formSignUp.resetForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

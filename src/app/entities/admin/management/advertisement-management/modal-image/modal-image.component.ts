import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal-image",
  templateUrl: "./modal-image.component.html",
  styleUrls: ["./modal-image.component.scss"]
})
export class ModalImageComponent implements OnInit {
  @Input() item;
  constructor() {}

  ngOnInit() {}
}

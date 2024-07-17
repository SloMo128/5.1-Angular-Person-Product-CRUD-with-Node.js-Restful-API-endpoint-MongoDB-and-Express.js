import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  isUsr: boolean = false;
  ngOnInit(): void {
    let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
    let storeDataSal = localStorage.getItem("isSalLoggedIn");
    let storeDataUsr = localStorage.getItem("isUsrLoggedIn");

    if (storeDataUsr != null && storeDataUsr == "true") {
      this.isUsr = true;
    }
  }
}
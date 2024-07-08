import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  title = 'angular';

  collapsed: boolean = true;

  isLoggedIn = false


  ngOnInit() {
    let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
    let storeDataSal = localStorage.getItem("isSalLoggedIn");
    let storeDataUsr = localStorage.getItem("isUsrLoggedIn");

    if (storeDataUsr != null && storeDataUsr == "true" || storeDataAdm != null && storeDataAdm == "true" || storeDataSal != null && storeDataSal == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
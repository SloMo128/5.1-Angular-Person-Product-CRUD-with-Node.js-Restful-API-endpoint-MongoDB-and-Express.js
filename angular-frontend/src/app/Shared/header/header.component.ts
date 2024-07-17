import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  title = 'angular';

  collapsed: boolean = true;

  isLoggedIn = false
  isAdm = false
  isUsr = false
  isSal = false
  check: string;


  ngOnInit() {
    let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
    let storeDataSal = localStorage.getItem("isSalLoggedIn");
    let storeDataUsr = localStorage.getItem("isUsrLoggedIn");

    if (storeDataUsr != null && storeDataUsr == "true") {
      this.isUsr = true;
      this.isLoggedIn = true;
    } else if (storeDataAdm != null && storeDataAdm == "true") {
      this.isAdm = true;
      this.isLoggedIn = true;
    } else if (storeDataSal != null && storeDataSal == "true") {
      this.isSal = true;
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
}
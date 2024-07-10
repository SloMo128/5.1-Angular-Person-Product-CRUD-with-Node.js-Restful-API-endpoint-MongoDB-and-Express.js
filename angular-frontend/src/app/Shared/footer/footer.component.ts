import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  title = 'angular';
  isLoggedIn: boolean = false;
  collapsed: boolean = true;

  ngOnInit(): void {
    localStorage.removeItem('productId');
    
    /*let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
    let storeDataSal = localStorage.getItem("isSalLoggedIn");
    let storeDataUsr = localStorage.getItem("isUsrLoggedIn");

    if (storeDataUsr != null && storeDataUsr == "true" || storeDataAdm != null && storeDataAdm == "true") {
      this.isLoggedIn = false;
    } else if (storeDataSal != null && storeDataSal == "true") {
      this.isLoggedIn = true;
    }*/
  }
}

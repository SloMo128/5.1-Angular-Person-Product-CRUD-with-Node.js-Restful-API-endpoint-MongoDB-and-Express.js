import { Component, OnInit } from '@angular/core';

import { AuthService } from '../Services/auth.service'; 
import { Router } from '@angular/router';

@Component({
   selector: 'app-logout',
   templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

   constructor(private authService : AuthService, private router: Router) { }

   ngOnInit() {
      this.authService.logout();
      this.router.navigate(['/'])
      .then(() => {
         window.location.reload();
       });
   }
}
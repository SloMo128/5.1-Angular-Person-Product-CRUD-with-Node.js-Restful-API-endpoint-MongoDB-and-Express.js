import {Component} from '@angular/core';
 
@Component({
    template: ` <h4>This is Home Component </h4>
    <p> All the info about creating a REST-API With JSON back-end server are available by clicking the following link:
        <a href="https://medium.com/codingthesmartway-com-blog/create-a-rest-api-with-json-server-36da8680136d" target="_blank">
            Create A REST API With JSON Server
        </a>
    </p>
    <nav class="navbar">

    <!-- logo -->
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="assets/img/angular-8.jpg" width="700px">
      </a>
    </div>
  </nav>

 `
})
 
export class HomeComponent {
}
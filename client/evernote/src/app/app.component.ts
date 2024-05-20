import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CollectionListItemComponent} from "./collection-list-item/collection-list-item.component";
import {CollectionListComponent} from "./collection-list/collection-list.component";
import {Collection} from "./shared/collection";
import {CollectionDetailsComponent} from "./collection-details/collection-details.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'en-root',
  standalone: true,
  imports: [RouterOutlet, CollectionListItemComponent, CollectionListComponent, CollectionDetailsComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'evernote';
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    return this.isLoggedIn() ? "Logout" : "Login";
  }


}

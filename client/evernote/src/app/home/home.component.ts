import {Component, Input, OnInit} from '@angular/core';
import {CollectionListItemComponent} from "../collection-list-item/collection-list-item.component";
import {CollectionListComponent} from "../collection-list/collection-list.component";
import {Collection} from "../shared/collection";
import {Todo} from "../shared/todo";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-home',
  standalone: true,
  imports: [
    CollectionListItemComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  // collections: Collection[] = [];
  // todos: Todo[] = [];
  constructor(private en:EvernoteStoreService) {
  }




  ngOnInit() {
    //
    // this.collections = this.en.getAll();
    // this.todos = this.en.getTodos();

  }
}

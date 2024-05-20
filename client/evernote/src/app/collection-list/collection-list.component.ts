
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Collection, Image, Note, User} from "../shared/collection";
import {CollectionListItemComponent} from "../collection-list-item/collection-list-item.component";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {NgClass} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-collection-list',
  standalone: true,
  imports: [
    CollectionListItemComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './collection-list.component.html',
  styles: ``
})
export class CollectionListComponent implements OnInit{

  collections: Collection[] = [];
  sharedCollections: Collection[] = [];
  keyup = new EventEmitter<string>();
  isLoading = false;
  foundCollections: Collection[] = []
  foundSharedCollections: Collection[] = [];
  userId: number | null = null;



  @Output() collectionSelected = new EventEmitter<Collection>;

  constructor(private en:EvernoteStoreService, private router:Router, private route: ActivatedRoute,  public authService:AuthenticationService) {
    this.userId = this.authService.getCurrentUserId();
  }


  ngOnInit() {
    this.en.getAllCollections().subscribe(res => {
      if (this.userId) {
        console.log(this.userId)
        // Separate collections created by the user and shared collections
        this.collections = res.filter(collection => collection.creator_id === this.userId);
        this.sharedCollections = res.filter(collection =>
          collection.collaborators && collection.collaborators.some(user => user.id === this.userId)
        );
      } else {
        // If no user is logged in, display all collections
        console.log(res)
        this.collections = res;
        this.sharedCollections = [];
      }
    });

    this.keyup.pipe(
      filter(term => term != ""),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.en.getSearchCollection(searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe(collections => {
      if (this.userId) {
        // Separate found collections created by the user and shared collections
        this.foundCollections = collections.filter(collection => collection.creator_id === this.userId);
        this.foundSharedCollections = collections.filter(collection =>
          collection.collaborators && collection.collaborators.some(user => user.id === this.userId));
      } else {
        // logedout
        this.foundCollections = collections;
        this.foundSharedCollections = [];
      }
    });
  }



}

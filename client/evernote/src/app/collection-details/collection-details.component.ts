import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Collection, Note} from "../shared/collection";
import {CollectionListItemComponent} from "../collection-list-item/collection-list-item.component";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EvernoteFactory} from "../shared/evernote-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
@Component({
  selector: 'en-collection-details',
  standalone: true,
  imports: [
    CollectionListItemComponent,
    RouterLink
  ],
  templateUrl: './collection-details.component.html',
})
export class CollectionDetailsComponent implements OnInit{
  collection: Collection = EvernoteFactory.emptyCollection();
  @Input() note:Note |undefined;

  constructor(private en:EvernoteStoreService, private route:ActivatedRoute, private router: Router, private toastr:ToastrService, public authService:AuthenticationService) {
  }

  ngOnInit() {
    console.log(this.collection);
    console.log(this.collection.images);
   const params = this.route.snapshot.params;
   this.en.getCollection(params["id"]).subscribe((c:Collection)=>this.collection = c);

  }


  removeCollection() {
    if (confirm('Liste wirklich löschen?')) {
      this.en.removeCollection(this.collection.id.toString())
        .subscribe((res:any) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.toastr.success('Liste gelöscht!', 'Erfolg!');
        }
        );
    }
    }

}

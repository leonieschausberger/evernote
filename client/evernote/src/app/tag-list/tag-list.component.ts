import { Component } from '@angular/core';
import {Tag, Todo} from "../shared/todo";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-tag-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tag-list.component.html',
  styles: ``
})
export class TagListComponent {
  tags: Tag[] = [];

  constructor(private en:EvernoteStoreService, private toastr:ToastrService, public authService:AuthenticationService) {
  }


  ngOnInit() {
    this.en.getAllTags().subscribe(res =>this.tags = res);

  }

  removeTag(tag_id: number) {
    if (confirm('Tag wirklich löschen?')) {
      console.log(tag_id);
      this.en.removeTag(tag_id.toString()).subscribe((res: any) => {
        console.log('Todo erfolgreich gelöscht, Seite wird neu geladen.');
        window.location.reload();
        this.toastr.success('Tag gelöscht!', 'Erfolg!');
      }, (error: any) => {
        console.error('Fehler beim Löschen des Todos:', error);
        alert('Fehler beim Löschen des Todos. Bitte versuchen Sie es erneut.');
      });
    }
  }
}

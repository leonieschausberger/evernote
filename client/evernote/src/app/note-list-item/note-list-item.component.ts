import {Component, Input} from '@angular/core';
import {Note} from "../shared/note";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-note-list-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './note-list-item.component.html',
  styles: ``
})
export class NoteListItemComponent {
  @Input() note!: Note;
}

import {Component, OnInit} from '@angular/core';
import {Collection, Note} from "../shared/collection";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {EvernoteFactory} from "../shared/evernote-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-note-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './note-details.component.html',
  styles: ``
})
export class NoteDetailsComponent implements OnInit{

  note: Note = EvernoteFactory.emptyNote();
  todo: Todo = EvernoteFactory.emptyTodo();
  collections: Collection | undefined;

  constructor(private en:EvernoteStoreService, private route:ActivatedRoute, private router: Router, private toastr:ToastrService,  public authService:AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.en.getNote(params["id"]).subscribe((n:Note)=> this.note = n);

  }

  toggleTodoDone(todo: Todo): void {
    todo.done = !todo.done;
    this.en.updateTodo(todo).subscribe(
      (res: any) => {
        this.toastr.success('Todo aktualisiert!', 'Erfolg!');
      },
      (error: any) => {
        console.error('Fehler beim Aktualisieren des Todos:', error);
        this.toastr.error('Fehler beim Aktualisieren des Todos. Bitte versuchen Sie es erneut.', 'Fehler!');
      }
    );
  }

  removeNote() {
    if (confirm('Note wirklich löschen?')) {
      console.log(this.note.id);

      this.en.removeNote(this.note.id.toString())
        .subscribe((res: any) => {
          this.router.navigate(['/collections', this.note.collections_id], { relativeTo: this.route });
          this.toastr.success('Notiz gelöscht!', 'Erfolg!');
        });
    }
  }

  removeTodo(todo_id:number) {
    if (confirm('Todo wirklich löschen?')) {
      console.log(todo_id);
      this.en.removeTodo(todo_id.toString()).subscribe((res: any) => {
        console.log('Todo erfolgreich gelöscht, Seite wird neu geladen.');
        window.location.reload();
        this.toastr.success('Todo gelöscht!', 'Erfolg!');
      }, (error: any) => {
        console.error('Fehler beim Löschen des Todos:', error);
        alert('Fehler beim Löschen des Todos. Bitte versuchen Sie es erneut.');
      });
    }
  }



}

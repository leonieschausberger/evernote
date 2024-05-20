import { Component } from '@angular/core';
import {Collection} from "../shared/collection";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {Todo} from "../shared/todo";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-todo-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent {
  todos: Todo[] = [];
  userId: number | null = null;

  constructor(private en:EvernoteStoreService, private toastr:ToastrService, public authService:AuthenticationService) {
    this.userId = this.authService.getCurrentUserId();
  }


  ngOnInit() {
    this.en.getAllTodos().subscribe(res => {
      if (this.userId) {

        console.log(this.userId)


        this.todos = res.filter(todo => todo.creator_id === this.userId);
      } else {
        this.todos = res.filter(todo => !todo.notes_id);
      }

    });

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

  removeTodo(todo_id: number) {
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

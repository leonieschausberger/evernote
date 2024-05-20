import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EvernoteFactory} from "../shared/evernote-factory";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection, User} from "../shared/collection";
import {Todo} from "../shared/todo";
import {TodoFormErrorMessages} from "./todo-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-collection-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements  OnInit{

  todoForm : FormGroup;
  todo = EvernoteFactory.emptyTodo();
  isUpdatingTodo = false;
  userId: number | null = null;

  errors: { [key: string]: string } = {};

  constructor(private fb:FormBuilder, private en: EvernoteStoreService, private route: ActivatedRoute, private  router:Router, private authService: AuthenticationService) {

    this.todoForm = this.fb.group({});
    this.userId = this.authService.isLoggedIn() ? this.authService.getCurrentUserId() : null;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const idnote = this.route.snapshot.params['note_id'];



    console.log(idnote);
    if (id) {
      this.isUpdatingTodo = true;
      this.en.getTodo(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
    this.initTodo();
  }


  initTodo(){

    this.todoForm = this.fb.group({
      id:this.todo.id,
      title: [this.todo.title, Validators.required],
      description: [this.todo.description, Validators.required],
      done: this.todo.done,
      dueDate: this.todo.due_date
    });
    this.todoForm.statusChanges.subscribe(()=> this.updateErrorMessages());

  }



  submitForm() {
    const alone = this.route.snapshot.params['alone'];
    const idnote = this.route.snapshot.params['note_id'];

    console.log("eingeben   " + alone)


    // Convert to boolean
    const todo: Todo = EvernoteFactory.fromObjectTodo(this.todoForm.value);
    console.log(this.todo.due_date);

    const id = this.route.snapshot.params['note_id'];
    todo.creator = this.todo.creator;
    if (this.isUpdatingTodo) {
      if(id === undefined){

        this.en.updateTodo(todo).subscribe(res => {
          this.router.navigate(["/todos"], {
            relativeTo: this.route
          });
        });


      } else {
        this.en.updateTodo(todo).subscribe(res => {
          this.router.navigate(["../../../../notes/", id], {
            relativeTo: this.route
          });
        });

      }
    } else if (idnote === 'true') {
        todo.notes_id = undefined;
        console.log(this.todo)
      if (this.userId !== null) {
        todo.creator_id = this.userId;
        todo.creator = { id: this.userId } as User; // Set only the id for simplicity
      }
      this.en.createTodo(todo).subscribe(res => {
        console.log(todo.due_date);
        this.todo = EvernoteFactory.emptyTodo();
        this.todoForm.reset(EvernoteFactory.emptyTodo());
        this.router.navigate(["/todos"], { relativeTo: this.route });
      });
    } else {
      console.log(id);
        todo.notes_id = this.route.snapshot.params['note_id'];
      console.log(todo.notes_id);

      if (this.userId !== null) {
        todo.creator_id = this.userId;
        todo.creator = { id: this.userId } as User;
      }

      console.log(todo);
      this.en.createTodo(todo).subscribe(res => {
        console.log(todo.due_date);
        this.todo = EvernoteFactory.emptyTodo();
        this.todoForm.reset(EvernoteFactory.emptyTodo());
        this.router.navigate(["../../notes/", todo.notes_id?.toString()], { relativeTo: this.route });
      });
    }
  }



  updateErrorMessages() {
    console.log("Is invalid? " + this.todoForm.invalid);
    this.errors = {};
    for (const message of TodoFormErrorMessages) {
      const control = this.todoForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

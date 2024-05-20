import { Injectable } from '@angular/core';
import { Collection, Image, Note } from './image';
import { Todo, User } from './user';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, map, retry, throwError} from "rxjs";
import {Tag} from "./tag";

@Injectable({
  providedIn: 'root'
})
export class EvernoteStoreService {

  private api = 'http://evernote.s2110456026.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }

  // Get --------------------------------------------

  getAllCollections():Observable<Array<Collection>>{
    return this.http.get<Array<Collection>>(`${this.api}/collections`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getCollection(id: string): Observable<Collection> {
    return this.http.get<Collection>(`${this.api}/collections/${id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler))
  }

  getAllTodos():Observable<Array<Todo>>{
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }



  getAllTags():Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllUsers():Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // Remove --------------------------------------------

  removeCollection(id: string): Observable<any> {
    console.log(id);
    return this.http.delete<Collection>(`${this.api}/collections/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  removeTodo(id: string) {
    return this.http.delete<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeNote(id: string): Observable<any> {
    console.log(id);
    return this.http.delete<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeTag(id: string) {
    console.log(id);
    return this.http.delete<Tag>(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  deleteTagFromNote(noteId: number, tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/notes/${noteId}/tags/${tagId}`);
  }

  addTagToNote(noteId: number, tagId: number): Observable<void> {
    return this.http.put<void>(`${this.api}/notes/${noteId}/tags/${tagId}`, {});
  }

  // Create ---------------------------------
  createCollection(collection:Collection): Observable<any> {
    return this.http.post(`${this.api}/collections`, collection)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createNote(note:Note): Observable<any> {
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createTodo(todo:Todo): Observable<any> {
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createTag(tag:Tag): Observable<any> {
    return this.http.post(`${this.api}/tags`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  // Update ---------------------------------

  updateCollection(collection:Collection): Observable<any> {
    return this.http.put(`${this.api}/collections/${collection.id.toString()}`, collection)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  updateNote(note:Note): Observable<any> {
    return this.http.put(`${this.api}/notes/${note.id.toString()}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateTodo(todo:Todo): Observable<any> {
    return this.http.put(`${this.api}/todos/${todo.id.toString()}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }



  // Search ---------------------------------
  getSearchCollection(searchTerm:string): Observable<Array<Collection>> {
    return this.http.get<Array<Collection>>(`${this.api}/collections/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }








  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }



}


import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CollectionListComponent} from "./collection-list/collection-list.component";
import {CollectionDetailsComponent} from "./collection-details/collection-details.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {CollectionFormComponent} from "./collection-form/collection-form.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {TagFormComponent} from "./tag-form/tag-form.component";

export const routes: Routes = [
  {path:'', redirectTo:'collections', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'collections', component: CollectionListComponent},
  {path:'collections/:id', component: CollectionDetailsComponent},
  {path:'notes/:id', component: NoteDetailsComponent},
  {path:'todos', component: TodoListComponent},
  {path:'tags', component: TagListComponent},
  {path:'admin', component: CollectionFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/:id', component: CollectionFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminNotes/:collection_id', component: NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminNotes/update/:id', component: NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodos/:note_id', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodos/:string', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodos/update/:note_id/:id', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodos/updateohnenote/:id', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTags', component: TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'login', component: LoginComponent}
];

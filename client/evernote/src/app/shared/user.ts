import {Collection} from "./collection";
export {Collection} from "./collection";
import {Todo} from "./todo";
import {EvernoteFactory} from "./evernote-factory";
export {Todo} from "./todo";

export class User {

  constructor(public id: number,
              public first_name: string,
              public last_name: string,
              public email: string,
              public password: string,
              public createdCollections?: Collection[],
              public sharedCollections?: Collection[],
              public createdTodos?: Todo[],
              public sharedTodos?: Todo[]) {
  }

  // static fromObject(rawUser: any): User {
  //   const createdCollections = rawUser.createdCollections ? rawUser.createdCollections.map((collection: any) =>
  //     EvernoteFactory.fromObject(collection)
  //   ) : [];
  //
  //   const sharedCollections = rawUser.sharedCollections ? rawUser.sharedCollections.map((collection: any) =>
  //     EvernoteFactory.fromObject(collection)
  //   ) : [];
  //
  //   const createdTodos = rawUser.createdTodos ? rawUser.createdTodos.map((todo: any) =>
  //     Todo.fromObject(todo)
  //   ) : [];
  //
  //   const sharedTodos = rawUser.sharedTodos ? rawUser.sharedTodos.map((todo: any) =>
  //     Todo.fromObject(todo)
  //   ) : [];
  //
  //   return new User(
  //     rawUser.id,
  //     rawUser.firstName,
  //     rawUser.lastName,
  //     rawUser.email,
  //     rawUser.password,
  //     createdCollections,
  //     sharedCollections,
  //     createdTodos,
  //     sharedTodos
  //   );
  // }

}

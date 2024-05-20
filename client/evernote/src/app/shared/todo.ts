import {Note} from "./note";
export {Note} from "./note";
import {User} from "./user";
export {User} from "./user";
import {Tag} from "./tag";
export {Tag} from "./tag";

export class Todo {

  // @ts-ignore
  constructor(public id: number,
              public title: string,
              public description: string,
              public done: boolean,
              public due_date?:  Date,
              public areYouPrivate?: boolean,
              public notes_id?: number,
              public notes?: Note,
              public creator?: User,
              public creator_id?: number,
              public collaborators?: User[],
              public tags?: Tag[],
              ) {
  }

  // static fromObject(rawTodo: any): Todo {
  //   const creator = new User(
  //     rawTodo.creator.id,
  //     rawTodo.creator.firstName,
  //     rawTodo.creator.lastName,
  //     rawTodo.creator.email,
  //     rawTodo.creator.password
  //   );
  //
  //   const collaboratorss = rawTodo.collaboratorss ? rawTodo.collaboratorss.map((collaborators: any) =>
  //     new User(
  //       collaborators.id,
  //       collaborators.firstName,
  //       collaborators.lastName,
  //       collaborators.email,
  //       collaborators.password
  //     )
  //   ) : [];
  //
  //   const tags = rawTodo.tags ? rawTodo.tags.map((tag: any) =>
  //     new Tag(
  //       tag.id,
  //       tag.title
  //     )
  //   ) : [];
  //
  //   return new Todo(
  //     rawTodo.id,
  //     rawTodo.title,
  //     rawTodo.description,
  //     rawTodo.done,
  //     rawTodo.dueDate,
  //     rawTodo.areYouPrivate,
  //     rawTodo.notesId,
  //     rawTodo.notes ? Note.fromObject(rawTodo.notes) : undefined,
  //     creator,
  //     collaboratorss,
  //     tags
  //   );
  // }
}

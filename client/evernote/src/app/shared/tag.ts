import {Note} from "./note";
export {Note} from "./note";
import {Todo} from "./todo";
export {Todo} from "./todo";

export class Tag {

  constructor(public id: number,
              public title: string,
              public notes?: Note[],
              public todos?: Todo[]) {
  }

  // static fromObject(rawTag: any): Tag {
  //   const notes = rawTag.notes ? rawTag.notes.map((note: any) =>
  //     Note.fromObject(note)
  //   ) : [];
  //
  //   const todos = rawTag.todos ? rawTag.todos.map((todo: any) =>
  //     Todo.fromObject(todo)
  //   ) : [];
  //
  //   return new Tag(
  //     rawTag.id,
  //     rawTag.title,
  //     notes,
  //     todos
  //   );
  // }
}

import {Collection, Image} from "./collection";
export {Collection, Image} from "./collection";
import {Todo} from "./todo";
export {Todo} from "./todo";
import {Tag} from "./tag";
export {Tag} from "./tag";

export class Note {

  constructor(public id: number,
              public title: string,
              public description: string,
              public images?: Image[],
              public collections_id?: number,
              public collections?: Collection,
              public todos?: Todo[],
              public tags?: Tag[]) {
  }

  // static fromObject(rawNote: any): Note {
  //   const images = rawNote.images ? rawNote.images.map((image: any) =>
  //     new Image(
  //       image.id,
  //       image.url,
  //       image.title
  //     )
  //   ) : [];
  //
  //   const todos = rawNote.todos ? rawNote.todos.map((todo: any) =>
  //     Todo.fromObject(todo)
  //   ) : [];
  //
  //   const tags = rawNote.tags ? rawNote.tags.map((tag: any) =>
  //     new Tag(
  //       tag.id,
  //       tag.title
  //     )
  //   ) : [];
  //
  //   return new Note(
  //     rawNote.id,
  //     rawNote.title,
  //     rawNote.description,
  //     images,
  //     null, // collections are not loaded here to avoid circular dependency
  //     todos,
  //     tags
  //   );
  // }
}

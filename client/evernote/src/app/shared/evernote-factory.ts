import { Collection } from './collection';
import { User } from './user';
import { Note } from './note';
import { Image } from './image';
import { Todo } from './todo';
import { Tag } from './tag';

export class EvernoteFactory {

  static emptyCollection(): Collection {

    return new Collection(
      0, // id
      '', // title
      '', // description
      false, // areYouPrivate
      new Date,
      undefined, // creator
      undefined, // creator_id
      [], // collaborators
      [], // notes
      [{id:0,url:'',title:''}] // images
    );
  }

  static emptyNote() {
    return new Note(
      0, // id
      '', // title
      '', // description
      [{id:0,url:'',title:''}], // images
      undefined, // collections_id
      undefined, // collections
      [], // todos
      [] // tags
    );
  }

  static emptyTodo() {
    return new Todo(
      0,
      '',
      '',
      false,
      undefined,
      false,
      undefined,
      undefined,
      undefined,
      undefined,
      [],
    );
  }

  static emptyTag(): Tag {
    return new Tag(
      0,        // Standardwert für ID
      '',       // Standardwert für Title
      [],       // Standardwert für Notes
      []        // Standardwert für Todos
    );
  }

  static emptyUser(): User {
    return new User(0,'','','','');
  }


  static fromObjectCollection(rawCollection: any): Collection {
    return new Collection(
      rawCollection.id,
      rawCollection.title,
      rawCollection.description,
      rawCollection.areYouPrivate,
      typeof(rawCollection.created_at) === 'string' ? new Date(rawCollection.created_at) : rawCollection.created_at,
      rawCollection.creator,
      rawCollection.creator_id,
      rawCollection.collaborators,
      rawCollection.notes,
      rawCollection.images
    );
  }

  static fromObjectNote(rawNote: any): Note {
    return new Note(
      rawNote.id,
      rawNote.title,
      rawNote.description,
      rawNote.images,
      rawNote.collection_id,
      rawNote.collections,
      rawNote.todos,
      rawNote.tags)
  }

  static fromObjectTodo(rawNote: any): Todo {
    return new Todo(
      rawNote.id,
      rawNote.title,
      rawNote.description,
      rawNote.done,
      typeof(rawNote.dueDate) === 'string' ? new Date(rawNote.dueDate): rawNote.dueDate,
      rawNote.areYouPrivate,
      rawNote.notes_id,
      rawNote.notes,
      rawNote.creator,
      rawNote.shareduser,
      rawNote.tags
      )

  }

  static fromObjectTag(rawTag: any): Tag {
    return new Tag(
      rawTag.id,
      rawTag.title,
      rawTag.notes,
      rawTag.todos
      )
  }



}

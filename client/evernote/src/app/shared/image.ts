import {Note} from "./note";
export {Note} from "./note";
import {Collection} from "./collection";
import {EvernoteStoreService} from "./evernote-store.service";
import {EvernoteFactory} from "./evernote-factory";
export {Collection} from "./collection";

export class Image {

  constructor(public id: number,
              public url: string,
              public title: string,
              public notes?: Note[],
              public collections?: Collection[]) {
  }

  // static fromObject(rawImage: any): Image {
  //   const notes = rawImage.notes ? rawImage.notes.map((note: any) =>
  //     Note.fromObject(note)
  //   ) : [];
  //
  //   const collections = rawImage.collections ? rawImage.collections.map((collection: any) =>
  //     EvernoteFactory.fromObject(collection)
  //   ) : [];
  //
  //   return new Image(
  //     rawImage.id,
  //     rawImage.url,
  //     rawImage.title,
  //     notes,
  //     collections
  //   );
  // }

}

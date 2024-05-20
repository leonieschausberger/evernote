import {Note} from "./note";
export {Note} from "./note";
import {Image} from "./image";
export {Image} from "./image";
import {User} from "./user";
export {User} from "./user";



export class Collection {

  constructor(public id: number,
              public title: string,
              public description: string,
              public areYouPrivate: boolean,
              public created_at: Date,
              public creator?: User,
              public creator_id?: number,
              public collaborators?: User[],
              public notes?: Note[],
              public images?: Image[]
              ) {
  }


}

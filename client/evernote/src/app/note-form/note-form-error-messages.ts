export class ErrorMessage {
  constructor(public forControl:string, public forValidator: string, public text: string) {}

}





export const NoteFormErrorMessages = [
  new ErrorMessage("title", "required", "Ein Titel muss angegeben werden"),
  new ErrorMessage("description", "required", "Eine Beschreibung muss angegeben werden"),
  new ErrorMessage("url", "required", "Eine Bild-URL muss angegeben werden"),
]




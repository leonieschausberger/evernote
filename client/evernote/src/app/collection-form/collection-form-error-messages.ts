

export class ErrorMessage {
  constructor(public forControl:string, public forValidator: string, public text: string) {}

}





export const CollectionFormErrorMessages = [
  new ErrorMessage("title", "required", "Ein Listentitel muss angegeben werden"),
  new ErrorMessage("description", "required", "Eine Beschreibung muss angegeben werden")
]




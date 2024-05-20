import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {EvernoteFactory} from "../shared/evernote-factory";
import {EvernoteStoreService} from "../shared/evernote-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection, Note} from "../shared/collection";
import {CollectionFormErrorMessages} from "../collection-form/collection-form-error-messages";
import {Tag} from "../shared/tag";
import {forkJoin} from "rxjs";

@Component({
  selector: 'en-note-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm : FormGroup;
  note = EvernoteFactory.emptyNote();
  isUpdatingNote = false;
  images: FormArray ;
  errors: { [key: string]: string } = {};

  availableTags: Tag[] = [];
  selectedTag: Tag | null = null;
  newTags: Tag[] = [];
  removedTags: Tag[] = [];





  constructor(private fb:FormBuilder, private en: EvernoteStoreService, private route: ActivatedRoute, private  router:Router) {

    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);

  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const collectionId = this.route.snapshot.params['collection_id'];
    console.log("noteID:"+ id);
    console.log("collectionID:"+ collectionId);

    this.en.getAllTags().subscribe(tags => {
      this.availableTags = tags.filter(tag => !this.note.tags?.some(noteTag => noteTag.id === tag.id));
    });


    if (id) {
      this.isUpdatingNote = true;
      this.en.getNote(id).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }


  initNote(){
    this.buildThumbnailsArray();

    this.noteForm = this.fb.group({
      id:this.note.id,
      title: [this.note.title, Validators.required],
      description: [this.note.description, Validators.required],
      images: this.images,
      tags: [this.note.tags ? this.note.tags : []]
    });
    // nur tags anzeigen, die noch nicht hinzugefügt wurden
    this.en.getAllTags().subscribe(tags => {
      this.availableTags = tags.filter(tag => !this.note.tags?.some(noteTag => noteTag.id === tag.id));
    });
    this.noteForm.statusChanges.subscribe(()=> this.updateErrorMessages());

  }



  buildThumbnailsArray() {
    if(this.note.images){
      this.images = this.fb.array([]);
      for (let img of this.note.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id), //this.fb.control(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });

        this.images.push(fg);

      }
    }
  }
  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title: null }));
  }


  submitForm() {
    const note: Note = EvernoteFactory.fromObjectNote(this.noteForm.value);
    note.tags = this.noteForm.value.tags;

    if (this.isUpdatingNote) {
      console.log("save");

      // Update note
      this.en.updateNote(note).subscribe(res => {
        const deleteObservables = this.removedTags.map(tag => this.en.deleteTagFromNote(note.id, tag.id));
        const addTagObservables = this.newTags.map(tag => this.en.addTagToNote(note.id, tag.id));

        if (deleteObservables.length > 0 || addTagObservables.length > 0) {
          // Combine both delete and add observables if there are any
          forkJoin([...deleteObservables, ...addTagObservables]).subscribe(() => {
            console.log('All changes to tags have been processed');
            this.removedTags = [];
            this.newTags = [];
            this.router.navigate(["/notes", note.id.toString()], {
              relativeTo: this.route
            });
            location.reload(); // Reload the page
          }, error => {
            console.error('Error processing tags:', error);
          });
        } else {
          // Navigate directly if no tags were added or removed
          this.router.navigate(["/notes", note.id.toString()], {
            relativeTo: this.route
          });
        }
      }, error => {
        console.error('Error updating the note:', error);
      });
    } else {
      note.collections_id = this.route.snapshot.params['collection_id'];
      console.log(note);
      this.en.createNote(note).subscribe(res => {
        this.note = EvernoteFactory.emptyNote();
        this.noteForm.reset(EvernoteFactory.emptyNote());
        this.router.navigate(["../../collections/", note.collections_id?.toString()], { relativeTo: this.route });
      });
    }
  }

  onTagSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const tagId = Number(selectElement.value);
    this.selectedTag = this.availableTags.find(tag => tag.id === tagId) || null;
  }

  get tags() {
    return this.noteForm.get('tags') as FormArray;
  }

  addTag() {

    if (this.selectedTag) {
      this.newTags.push(this.selectedTag);
      this.en.addTagToNote(this.note.id, this.selectedTag.id)
      console.log(this.newTags);
      console.log(this.selectedTag);
      //this.tags.push(new FormControl(this.selectedTag));
      this.selectedTag = null;
    }
    this.saveTagsToDatabase();
  }

  saveTagsToDatabase() {
    if (this.isUpdatingNote) {

      console.log("das ist die UpdatingNote"+ this.isUpdatingNote);

      const addTagObservables = this.newTags.map(tag => this.en.addTagToNote(this.note.id, tag.id));
      forkJoin(addTagObservables).subscribe(() => {
        console.log('All new tags successfully added to the note');
        this.newTags = []; // Clear the newTags array after successful addition
        location.reload(); // Reload the page
      }, error => {
        console.error('Error adding tags to note:', error);
      });
    }
  }

  removeTag(id: number) {
    const tags = this.noteForm.controls['tags'].value;
    const tagIndex = tags.findIndex((tag: any) => tag.id === id);

    if (tagIndex !== -1) {
      const removedTag = tags.splice(tagIndex, 1)[0];
      console.log(tags);
      this.noteForm.controls['tags'].setValue(tags);
      this.note.tags = tags;

      // Add removed tag to removedTags array
      this.removedTags.push(removedTag);

    }

  }



  updateErrorMessages() {
    console.log("Is invalid? " + this.noteForm.invalid);
    this.errors = {};
    for (const message of CollectionFormErrorMessages) {
      const control = this.noteForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


}

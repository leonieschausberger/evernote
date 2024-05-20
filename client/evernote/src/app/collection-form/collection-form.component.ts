import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EvernoteFactory } from "../shared/evernote-factory";
import { EvernoteStoreService } from "../shared/evernote-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Collection, User } from "../shared/collection";
import { CollectionFormErrorMessages } from "./collection-form-error-messages";
import { NgFor, NumberFormatStyle } from '@angular/common';
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-collection-form',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './collection-form.component.html',
  styles: ``
})
export class CollectionFormComponent implements OnInit {

  collectionForm: FormGroup;
  collection = EvernoteFactory.emptyCollection();
  isUpdatingCollection = false;
  images: FormArray;
  errors: { [key: string]: string } = {};
  allUsers: User[] = [];
  userId: number | null = null;

  constructor(private fb: FormBuilder, private en: EvernoteStoreService, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
    this.collectionForm = this.fb.group({});
    this.images = this.fb.array([]);
    this.userId = this.authService.isLoggedIn() ? this.authService.getCurrentUserId() : null;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.isUpdatingCollection = true;
      this.en.getCollection(id).subscribe(collection => {
        this.collection = collection;
        this.initCollection();
      });

      this.en.getAllUsers().subscribe(users => {
        this.allUsers = users.filter(user => user.id !== this.userId);
      })
    }
    this.initCollection();
  }


  initCollection() {
    this.buildThumbnailsArray();

    this.collectionForm = this.fb.group({
      id: this.collection.id,
      title: [this.collection.title, Validators.required],
      areYouPrivate: [this.collection.areYouPrivate || false],
      description: [this.collection.description, Validators.required],
      images: this.images,
      collaborators: this.fb.array(this.collection.collaborators ? this.collection.collaborators : [])
    });

    this.collectionForm.get('areYouPrivate')?.valueChanges.subscribe(value => {
      if (value) {
        this.clearCollaborators();
      }
    });


    this.collectionForm.statusChanges.subscribe(() => this.updateErrorMessages());

  }

  clearCollaborators() {
    const collaborators = this.collectionForm.get('collaborators') as FormArray;
    while (collaborators.length !== 0) {
      collaborators.removeAt(0);
    }
  }

  buildThumbnailsArray() {
    if (this.collection.images) {
      this.images = this.fb.array([]);
      for (let img of this.collection.images) {
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
    // filter empty values
    this.collectionForm.value.images = this.collectionForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url
    );
    const collection: Collection = EvernoteFactory.fromObjectCollection(this.collectionForm.value);
    //just copy the authors

    if (this.isUpdatingCollection) {
      collection.creator = this.collection.creator;
      this.en.updateCollection(collection).subscribe(res => {
        this.router.navigate(["/collections", collection.id.toString()], {
          relativeTo: this.route
        });
      });
    } else {
      if (this.userId !== null) {
        collection.creator_id = this.userId;
        collection.creator = { id: this.userId } as User;
      }
      console.log(collection);
      this.en.createCollection(collection).subscribe(res => {
        this.collection = EvernoteFactory.emptyCollection();
        this.collectionForm.reset(EvernoteFactory.emptyCollection());
        this.router.navigate(["../collections"], { relativeTo: this.route });
      });
    }
  }



  updateErrorMessages() {
    console.log("Is invalid? " + this.collectionForm.invalid);
    this.errors = {};
    for (const message of CollectionFormErrorMessages) {
      const control = this.collectionForm.get(message.forControl);
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

  isCollectionSharedWithUser(userId: number) {
    return this.collection.collaborators?.find(collaborator => userId === collaborator.id);
  }

  onCheckboxChange(event: any) {

    console.log("collectionForm > onCheckboxChange > form before checked: " + JSON.stringify(this.collectionForm.value));

    const collaborators = this.collectionForm.controls['collaborators'] as FormArray;

    const id = event.target.value as number;

    const user = this.allUsers.find(x => x.id == id);
    console.log("collectionForm > onCheckboxChange > user changed: " + id + " " + JSON.stringify(user));

    if (event.target.checked) {
      collaborators.push(this.fb.control(user));
    } else {
      const index = collaborators.controls.findIndex(collaborator => collaborator.value.id == (event.target.value as number));
      collaborators.removeAt(index);
    }

    console.log("collectionForm > onCheckboxChange >form after checked: " + JSON.stringify(this.collectionForm.value));
  }
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EvernoteStoreService } from "../shared/evernote-store.service";
import { Tag } from "../shared/tag";
import { TagFormErrorMessages } from "./tag-form-error-messages";
import { EvernoteFactory } from "../shared/evernote-factory";

@Component({
  selector: 'en-tag-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './tag-form.component.html',
  styles: ``
})
export class TagFormComponent implements OnInit {

  tagForm: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private en: EvernoteStoreService, private router: Router) {
    this.tagForm = this.fb.group({});
  }

  ngOnInit() {
    this.initTag();
  }

  initTag() {
    this.tagForm = this.fb.group({
      title: ["", Validators.required]
    });
    this.tagForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    const tag: Tag = EvernoteFactory.fromObjectTag(this.tagForm.value);

    this.en.createTag(tag).subscribe(res => {
      this.tagForm.reset();
      this.router.navigate(["../tags"], { relativeTo: this.router.routerState.root });
    });
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.tagForm.invalid);
    this.errors = {};
    for (const message of TagFormErrorMessages) {
      const control = this.tagForm.get(message.forControl);
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

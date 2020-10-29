import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import JSONEditor from '@json-editor/json-editor';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NbDialogRef } from '@nebular/theme'
import { JsonEditorComponent } from 'ng2-json-editor';

@Component({
  selector: 'eapi-data-moduleexercise-dialog',
  templateUrl: './moduleexercise-dialog.component.html',
  styleUrls: ['./moduleexercise-dialog.component.scss']
})
export class ModuleExerciseDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  moduleexerciseToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<ModuleExerciseDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "ModuleExerciseId",
        "DisplayName",
        "Attachments",
        "Module",
        "Exercise",
        "ExerciseNumber",
        "EnergyForSuccessWebPageHeader",
        "Note",
        "Course",
        "Vibrations",
        "CoursePic",
      ],
      properties: {
        "ModuleExerciseId": {
          $id: "#/properties/ModuleExerciseId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "DisplayName": {
          $id: "#/properties/DisplayName",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Attachments": {
          $id: "#/properties/Attachments",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Module": {
          $id: "#/properties/Module",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Exercise": {
          $id: "#/properties/Exercise",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "ExerciseNumber": {
          $id: "#/properties/ExerciseNumber",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "EnergyForSuccessWebPageHeader": {
          $id: "#/properties/EnergyForSuccessWebPageHeader",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Note": {
          $id: "#/properties/Note",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Course": {
          $id: "#/properties/Course",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Vibrations": {
          $id: "#/properties/Vibrations",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "CoursePic": {
          $id: "#/properties/CoursePic",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
      }
    };
  }


  ngOnInit() {
    const element = this.doc.getElementById('editor_holder');
    var options = {
      theme: 'bootstrap4',
      iconlib: "fontawesome5",
      schema: this.mySchema,
    };
    this.editor = new window['JSONEditor'](element, options);
  }

  cancel() {
    this.dialogRef.close();
  }

  addModuleExercise() {
    var payload = this.gds.createPayload();
    payload.ModuleExercise = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddModuleExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/moduleexercises/moduleexercise/' + reply.ModuleExercise.ModuleExerciseId);
      }
    });
  }

}
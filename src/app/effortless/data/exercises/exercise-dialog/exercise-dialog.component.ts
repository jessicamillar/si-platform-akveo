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
  selector: 'eapi-data-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.scss']
})
export class ExerciseDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  exerciseToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<ExerciseDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "ExerciseId",
        "GuanYinName",
        "Description",
        "IsPhysical",
        "ModuleExercises",
        "Shards",
        "IsBarryBreathing",
        "Number",
        "IsBarryLecture",
        "IsDrBOriginStory",
        "IsDrBCatapultCall",
        "IsBarryOther",
        "IsDsMindflow",
        "IsPremier",
        "IsGuidesLiveStream",
        "IsGuidesOther",
        "IsKeeneys",
        "Module",
        "Course",
        "ExerciseVibrations",
        "ExerciseFavorites",
        "ExerciseLikes",
        "VibrationNames",
        "CoursePic",
      ],
      properties: {
        "ExerciseId": {
          $id: "#/properties/ExerciseId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "GuanYinName": {
          $id: "#/properties/GuanYinName",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Description": {
          $id: "#/properties/Description",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsPhysical": {
          $id: "#/properties/IsPhysical",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "ModuleExercises": {
          $id: "#/properties/ModuleExercises",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Shards": {
          $id: "#/properties/Shards",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "IsBarryBreathing": {
          $id: "#/properties/IsBarryBreathing",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Number": {
          $id: "#/properties/Number",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsBarryLecture": {
          $id: "#/properties/IsBarryLecture",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsDrBOriginStory": {
          $id: "#/properties/IsDrBOriginStory",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsDrBCatapultCall": {
          $id: "#/properties/IsDrBCatapultCall",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsBarryOther": {
          $id: "#/properties/IsBarryOther",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsDsMindflow": {
          $id: "#/properties/IsDsMindflow",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsPremier": {
          $id: "#/properties/IsPremier",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsGuidesLiveStream": {
          $id: "#/properties/IsGuidesLiveStream",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsGuidesOther": {
          $id: "#/properties/IsGuidesOther",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "IsKeeneys": {
          $id: "#/properties/IsKeeneys",
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
        "ExerciseVibrations": {
          $id: "#/properties/ExerciseVibrations",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "ExerciseFavorites": {
          $id: "#/properties/ExerciseFavorites",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "ExerciseLikes": {
          $id: "#/properties/ExerciseLikes",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "VibrationNames": {
          $id: "#/properties/VibrationNames",
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

  addExercise() {
    var payload = this.gds.createPayload();
    payload.Exercise = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/exercises/exercise/' + reply.Exercise.ExerciseId);
      }
    });
  }

}
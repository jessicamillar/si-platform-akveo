import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../../efforless-base-component';
import { GDS } from '../../../services/gds.service';
import { DataEndpoint } from '../../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { JSONEditor } from '@json-editor/json-editor';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'eapi-data-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent extends EffortlessComponentBase implements OnInit {
  exercise$: Observable<any>;
  exercise: any;
  id: any;
  config: any;
  mySchema: any;
  editor: any;
  private doc: any;
  
  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected toastr : NbToastrService, protected menuService : NbMenuService, public router : Router,
            @Inject(DOCUMENT) document) { 
    super(gds, data, menuService);
    this.doc = document;
    this.exercise$ = this.data.onExerciseChange();
    this.safeSubscribe(this.exercise$.subscribe(data => {
      this.exercise = data
      if (this.editor) {
        this.editor.setValue(this.exercise)
      }
      this.loading = false;
    }));
    
    this.config = {};
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
      "properties": {
        "ExerciseId": {
          $id: "#/properties/ExerciseId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "GuanYinName": {
          $id: "#/properties/GuanYinName",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Description": {
          $id: "#/properties/Description",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsPhysical": {
          $id: "#/properties/IsPhysical",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "ModuleExercises": {
          $id: "#/properties/ModuleExercises",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Shards": {
          $id: "#/properties/Shards",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsBarryBreathing": {
          $id: "#/properties/IsBarryBreathing",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Number": {
          $id: "#/properties/Number",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsBarryLecture": {
          $id: "#/properties/IsBarryLecture",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsDrBOriginStory": {
          $id: "#/properties/IsDrBOriginStory",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsDrBCatapultCall": {
          $id: "#/properties/IsDrBCatapultCall",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsBarryOther": {
          $id: "#/properties/IsBarryOther",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsDsMindflow": {
          $id: "#/properties/IsDsMindflow",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsPremier": {
          $id: "#/properties/IsPremier",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsGuidesLiveStream": {
          $id: "#/properties/IsGuidesLiveStream",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsGuidesOther": {
          $id: "#/properties/IsGuidesOther",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsKeeneys": {
          $id: "#/properties/IsKeeneys",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Module": {
          $id: "#/properties/Module",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Course": {
          $id: "#/properties/Course",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "ExerciseVibrations": {
          $id: "#/properties/ExerciseVibrations",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "ExerciseFavorites": {
          $id: "#/properties/ExerciseFavorites",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "ExerciseLikes": {
          $id: "#/properties/ExerciseLikes",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "VibrationNames": {
          $id: "#/properties/VibrationNames",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "CoursePic": {
          $id: "#/properties/CoursePic",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
      }
    };
  }

  ngOnInit() {
    super.ngOnInit()
    const element = this.doc.getElementById('editor_holder');
    var options = {
      theme: 'bootstrap4',
      iconlib: "fontawesome5",
      schema: this.mySchema,
    };
    this.editor = new JSONEditor(element, options);
    this.editor.on('change',() => {
      console.log(this.editor.getValue())
    });
  }
  
  save() {
    var payload = this.gds.createPayload();
    payload.Exercise = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateExercise(payload)
        .then(reply => {
          this.exercise  = reply.Exercise;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('Exercise Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['exerciseId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadExerciseWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/exercises')
  }
}

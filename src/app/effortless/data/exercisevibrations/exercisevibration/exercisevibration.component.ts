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
  selector: 'eapi-data-exercisevibration',
  templateUrl: './exercisevibration.component.html',
  styleUrls: ['./exercisevibration.component.scss']
})
export class ExerciseVibrationComponent extends EffortlessComponentBase implements OnInit {
  exercisevibration$: Observable<any>;
  exercisevibration: any;
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
    this.exercisevibration$ = this.data.onExerciseVibrationChange();
    this.safeSubscribe(this.exercisevibration$.subscribe(data => {
      this.exercisevibration = data
      if (this.editor) {
        this.editor.setValue(this.exercisevibration)
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
        "ExerciseVibrationId",
        "Name",
        "Exercise",
        "Vibration",
        "GreatEight",
        "Amplitude",
      ],
      "properties": {
        "ExerciseVibrationId": {
          $id: "#/properties/ExerciseVibrationId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Name": {
          $id: "#/properties/Name",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Exercise": {
          $id: "#/properties/Exercise",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Vibration": {
          $id: "#/properties/Vibration",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "GreatEight": {
          $id: "#/properties/GreatEight",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Amplitude": {
          $id: "#/properties/Amplitude",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
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
    payload.ExerciseVibration = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateExerciseVibration(payload)
        .then(reply => {
          this.exercisevibration  = reply.ExerciseVibration;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('ExerciseVibration Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['exercisevibrationId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadExerciseVibrationWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/exercisevibrations')
  }
}

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
  selector: 'eapi-data-breathingexercisevisualhook-dialog',
  templateUrl: './breathingexercisevisualhook-dialog.component.html',
  styleUrls: ['./breathingexercisevisualhook-dialog.component.scss']
})
export class BreathingExerciseVisualHookDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  breathingexercisevisualhookToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<BreathingExerciseVisualHookDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "BreathingExerciseVisualHookId",
        "Name",
        "Notes",
        "Attachments",
      ],
      properties: {
        "BreathingExerciseVisualHookId": {
          $id: "#/properties/BreathingExerciseVisualHookId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Name": {
          $id: "#/properties/Name",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Notes": {
          $id: "#/properties/Notes",
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

  addBreathingExerciseVisualHook() {
    var payload = this.gds.createPayload();
    payload.BreathingExerciseVisualHook = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddBreathingExerciseVisualHook(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/breathingexercisevisualhooks/breathingexercisevisualhook/' + reply.BreathingExerciseVisualHook.BreathingExerciseVisualHookId);
      }
    });
  }

}
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
  selector: 'eapi-data-vibrationalcategory-dialog',
  templateUrl: './vibrationalcategory-dialog.component.html',
  styleUrls: ['./vibrationalcategory-dialog.component.scss']
})
export class VibrationalCategoryDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  vibrationalcategoryToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<VibrationalCategoryDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "VibrationalCategoryId",
        "Name",
        "Notes",
        "GreatEight",
        "ExerciseVibrations",
        "LongerName",
      ],
      properties: {
        "VibrationalCategoryId": {
          $id: "#/properties/VibrationalCategoryId",
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
        "GreatEight": {
          $id: "#/properties/GreatEight",
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
        "LongerName": {
          $id: "#/properties/LongerName",
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

  addVibrationalCategory() {
    var payload = this.gds.createPayload();
    payload.VibrationalCategory = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddVibrationalCategory(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/vibrationalcategories/vibrationalcategory/' + reply.VibrationalCategory.VibrationalCategoryId);
      }
    });
  }

}
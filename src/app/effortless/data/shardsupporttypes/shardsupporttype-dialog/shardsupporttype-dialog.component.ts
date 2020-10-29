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
  selector: 'eapi-data-shardsupporttype-dialog',
  templateUrl: './shardsupporttype-dialog.component.html',
  styleUrls: ['./shardsupporttype-dialog.component.scss']
})
export class ShardSupportTypeDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  shardsupporttypeToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<ShardSupportTypeDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "ShardSupportTypeId",
        "Value",
        "Description",
        "ShardSupports",
      ],
      properties: {
        "ShardSupportTypeId": {
          $id: "#/properties/ShardSupportTypeId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Value": {
          $id: "#/properties/Value",
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
        "ShardSupports": {
          $id: "#/properties/ShardSupports",
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

  addShardSupportType() {
    var payload = this.gds.createPayload();
    payload.ShardSupportType = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddShardSupportType(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/shardsupporttypes/shardsupporttype/' + reply.ShardSupportType.ShardSupportTypeId);
      }
    });
  }

}
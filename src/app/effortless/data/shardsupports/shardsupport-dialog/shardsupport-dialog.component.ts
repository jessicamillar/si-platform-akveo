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
  selector: 'eapi-data-shardsupport-dialog',
  templateUrl: './shardsupport-dialog.component.html',
  styleUrls: ['./shardsupport-dialog.component.scss']
})
export class ShardSupportDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  shardsupportToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<ShardSupportDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "ShardSupportId",
        "FileName",
        "Shard",
        "Status",
        "Type",
        "DateEstimate",
        "Format",
      ],
      properties: {
        "ShardSupportId": {
          $id: "#/properties/ShardSupportId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "FileName": {
          $id: "#/properties/FileName",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Shard": {
          $id: "#/properties/Shard",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Status": {
          $id: "#/properties/Status",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Type": {
          $id: "#/properties/Type",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "DateEstimate": {
          $id: "#/properties/DateEstimate",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Format": {
          $id: "#/properties/Format",
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

  addShardSupport() {
    var payload = this.gds.createPayload();
    payload.ShardSupport = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddShardSupport(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/shardsupports/shardsupport/' + reply.ShardSupport.ShardSupportId);
      }
    });
  }

}
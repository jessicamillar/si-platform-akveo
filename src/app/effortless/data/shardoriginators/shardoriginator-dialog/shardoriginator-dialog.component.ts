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
  selector: 'eapi-data-shardoriginator-dialog',
  templateUrl: './shardoriginator-dialog.component.html',
  styleUrls: ['./shardoriginator-dialog.component.scss']
})
export class ShardOriginatorDialogComponent implements OnInit {

  private doc: any;
  mySchema: any = {};
  editor: any;

  shardoriginatorToAdd: any;

  constructor(@Inject(DOCUMENT) document, protected dialogRef: NbDialogRef<ShardOriginatorDialogComponent>,
    public gds: GDS, public router: Router) {
    this.doc = document;
    this.mySchema = {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/root.json",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "ShardOriginatorId",
        "Alias",
        "Notes",
        "Attachments",
        "Sketches",
        "Shard",
        "email",
        "Role",
      ],
      properties: {
        "ShardOriginatorId": {
          $id: "#/properties/ShardOriginatorId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          pattern: "^(.*)$"
        },
        "Alias": {
          $id: "#/properties/Alias",
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
        "Sketches": {
          $id: "#/properties/Sketches",
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
        "email": {
          $id: "#/properties/email",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          pattern: "^(.*)$"
        },
        "Role": {
          $id: "#/properties/Role",
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

  addShardOriginator() {
    var payload = this.gds.createPayload();
    payload.ShardOriginator = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).AddShardOriginator(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.cancel();
        this.router.navigateByUrl('effortless/data/shardoriginators/shardoriginator/' + reply.ShardOriginator.ShardOriginatorId);
      }
    });
  }

}
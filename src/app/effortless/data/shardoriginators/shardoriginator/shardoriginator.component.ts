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
  selector: 'eapi-data-shardoriginator',
  templateUrl: './shardoriginator.component.html',
  styleUrls: ['./shardoriginator.component.scss']
})
export class ShardOriginatorComponent extends EffortlessComponentBase implements OnInit {
  shardoriginator$: Observable<any>;
  shardoriginator: any;
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
    this.shardoriginator$ = this.data.onShardOriginatorChange();
    this.safeSubscribe(this.shardoriginator$.subscribe(data => {
      this.shardoriginator = data
      if (this.editor) {
        this.editor.setValue(this.shardoriginator)
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
        "ShardOriginatorId",
        "Alias",
        "Notes",
        "Attachments",
        "Sketches",
        "Shard",
        "email",
        "Role",
      ],
      "properties": {
        "ShardOriginatorId": {
          $id: "#/properties/ShardOriginatorId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Alias": {
          $id: "#/properties/Alias",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Notes": {
          $id: "#/properties/Notes",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Attachments": {
          $id: "#/properties/Attachments",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Sketches": {
          $id: "#/properties/Sketches",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Shard": {
          $id: "#/properties/Shard",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "email": {
          $id: "#/properties/email",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Role": {
          $id: "#/properties/Role",
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
    payload.ShardOriginator = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateShardOriginator(payload)
        .then(reply => {
          this.shardoriginator  = reply.ShardOriginator;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('ShardOriginator Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['shardoriginatorId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadShardOriginatorWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/shardoriginators')
  }
}

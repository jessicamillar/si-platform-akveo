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
  selector: 'eapi-data-shardsupport',
  templateUrl: './shardsupport.component.html',
  styleUrls: ['./shardsupport.component.scss']
})
export class ShardSupportComponent extends EffortlessComponentBase implements OnInit {
  shardsupport$: Observable<any>;
  shardsupport: any;
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
    this.shardsupport$ = this.data.onShardSupportChange();
    this.safeSubscribe(this.shardsupport$.subscribe(data => {
      this.shardsupport = data
      if (this.editor) {
        this.editor.setValue(this.shardsupport)
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
        "ShardSupportId",
        "FileName",
        "Shard",
        "Status",
        "Type",
        "DateEstimate",
        "Format",
      ],
      "properties": {
        "ShardSupportId": {
          $id: "#/properties/ShardSupportId",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "FileName": {
          $id: "#/properties/FileName",
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
        "Status": {
          $id: "#/properties/Status",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Type": {
          $id: "#/properties/Type",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "DateEstimate": {
          $id: "#/properties/DateEstimate",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Format": {
          $id: "#/properties/Format",
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
    payload.ShardSupport = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateShardSupport(payload)
        .then(reply => {
          this.shardsupport  = reply.ShardSupport;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('ShardSupport Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['shardsupportId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadShardSupportWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/shardsupports')
  }
}

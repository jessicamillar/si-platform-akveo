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
  selector: 'eapi-data-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.scss']
})
export class UserRoleComponent extends EffortlessComponentBase implements OnInit {
  userrole$: Observable<any>;
  userrole: any;
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
    this.userrole$ = this.data.onUserRoleChange();
    this.safeSubscribe(this.userrole$.subscribe(data => {
      this.userrole = data
      if (this.editor) {
        this.editor.setValue(this.userrole)
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
        "UserRoleId",
        "Name",
        "Notes",
        "Attachments",
        "ShardOriginators",
        "Users",
      ],
      "properties": {
        "UserRoleId": {
          $id: "#/properties/UserRoleId",
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
        "ShardOriginators": {
          $id: "#/properties/ShardOriginators",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Users": {
          $id: "#/properties/Users",
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
    payload.UserRole = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateUserRole(payload)
        .then(reply => {
          this.userrole  = reply.UserRole;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('UserRole Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['userroleId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadUserRoleWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/userroles')
  }
}

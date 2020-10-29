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
  selector: 'eapi-data-shard',
  templateUrl: './shard.component.html',
  styleUrls: ['./shard.component.scss']
})
export class ShardComponent extends EffortlessComponentBase implements OnInit {
  shard$: Observable<any>;
  shard: any;
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
    this.shard$ = this.data.onShardChange();
    this.safeSubscribe(this.shard$.subscribe(data => {
      this.shard = data
      if (this.editor) {
        this.editor.setValue(this.shard)
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
        "ShardId",
        "FileName",
        "ParentStartOffset",
        "Parent",
        "IsPhysicalExercise",
        "Exercise",
        "IsBarryBreathingExercise",
        "Duration",
        "Transcripts",
        "IsBarryLecture",
        "IsDrBOriginStory",
        "TinyUrl",
        "IsBarryCatapultCall",
        "IsOtherBarryExercise",
        "Maker",
        "IsDsMindflow",
        "RoughOriginDate",
        "IdInShard",
        "IsGuidesLiveStream",
        "Format",
        "IsGuidesOther",
        "IsKeeneys",
        "module",
        "Course",
        "DurationOutOfAscended",
        "Vibrations",
        "CoursePic",
        "ShardUuid",
      ],
      "properties": {
        "ShardId": {
          $id: "#/properties/ShardId",
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
        "ParentStartOffset": {
          $id: "#/properties/ParentStartOffset",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Parent": {
          $id: "#/properties/Parent",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsPhysicalExercise": {
          $id: "#/properties/IsPhysicalExercise",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
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
        "IsBarryBreathingExercise": {
          $id: "#/properties/IsBarryBreathingExercise",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Duration": {
          $id: "#/properties/Duration",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Transcripts": {
          $id: "#/properties/Transcripts",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsBarryLecture": {
          $id: "#/properties/IsBarryLecture",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsDrBOriginStory": {
          $id: "#/properties/IsDrBOriginStory",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "TinyUrl": {
          $id: "#/properties/TinyUrl",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IsBarryCatapultCall": {
          $id: "#/properties/IsBarryCatapultCall",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsOtherBarryExercise": {
          $id: "#/properties/IsOtherBarryExercise",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "Maker": {
          $id: "#/properties/Maker",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsDsMindflow": {
          $id: "#/properties/IsDsMindflow",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "RoughOriginDate": {
          $id: "#/properties/RoughOriginDate",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "IdInShard": {
          $id: "#/properties/IdInShard",
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
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
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
        "IsGuidesOther": {
          $id: "#/properties/IsGuidesOther",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "IsKeeneys": {
          $id: "#/properties/IsKeeneys",
          type: "array",
          title: "",
          default: "",
          options: {
            hidden: true,
          },
          "pattern": "^(.*)$"
        },
        "module": {
          $id: "#/properties/module",
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
        "DurationOutOfAscended": {
          $id: "#/properties/DurationOutOfAscended",
          type: "string",
          title: "",
          default: "",
          options: {
            hidden: false,
          },
          "pattern": "^(.*)$"
        },
        "Vibrations": {
          $id: "#/properties/Vibrations",
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
        "ShardUuid": {
          $id: "#/properties/ShardUuid",
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
    payload.Shard = this.editor.getValue();
    (this.gds.smqUser || this.gds.smqGuest).UpdateShard(payload)
        .then(reply => {
          this.shard  = reply.Shard;
          if (reply.ErrorMessage) {
            this.toastr.show(reply.ErrorMessage)
          } else {
            this.toastr.show('Shard Saved...');
            this.goBack()
          }
        });
  }

  onGdsReady() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.id = params['shardId'];
      this.reload(this);
    });
  }

  reload(self: this) {
    self.loading = true;
    self.data.reloadShardWhere(self.gds.smqUser || self.gds.smqGuest, "RECORD_ID()='" + self.id + "'");
  }

  goBack() {
    this.router.navigateByUrl('effortless/data/shards')
  }
}

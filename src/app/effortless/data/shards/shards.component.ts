import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardDialogComponent } from './shard-dialog/shard-dialog.component'

@Component({
  selector: 'eapi-data-shards',
  templateUrl: './shards.component.html',
  styleUrls: ['./shards.component.scss']
})
export class ShardsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shards: any[] = [];
  filteredShards: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardsChange().subscribe(shards => {
      this.shards = shards;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShards = this.shards.filter(shard => !this.searchText || shard.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShards(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShard(id) {
    this.router.navigateByUrl('effortless/data/shards/shard/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShard(shardToDelete) {
    var payload = this.gds.createPayload();
    payload.Shard = shardToDelete;
    this.gds.smqUser.DeleteShard(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShard(shardToAdd) {
    var payload = this.gds.createPayload();
    payload.Shard = shardToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShard(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shards/shard/' + reply.Shard.ShardId);
      }
    });
  }
}

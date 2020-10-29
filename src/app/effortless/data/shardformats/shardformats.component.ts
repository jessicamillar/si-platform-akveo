import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardFormatDialogComponent } from './shardformat-dialog/shardformat-dialog.component'

@Component({
  selector: 'eapi-data-shardformats',
  templateUrl: './shardformats.component.html',
  styleUrls: ['./shardformats.component.scss']
})
export class ShardFormatsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shardformats: any[] = [];
  filteredShardFormats: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardFormatsChange().subscribe(shardformats => {
      this.shardformats = shardformats;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShardFormats = this.shardformats.filter(shardformat => !this.searchText || shardformat.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShardFormats(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShardFormat(id) {
    this.router.navigateByUrl('effortless/data/shardformats/shardformat/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardFormatDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShardFormat(shardformatToDelete) {
    var payload = this.gds.createPayload();
    payload.ShardFormat = shardformatToDelete;
    this.gds.smqUser.DeleteShardFormat(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShardFormat(shardformatToAdd) {
    var payload = this.gds.createPayload();
    payload.ShardFormat = shardformatToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShardFormat(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shardformats/shardformat/' + reply.ShardFormat.ShardFormatId);
      }
    });
  }
}

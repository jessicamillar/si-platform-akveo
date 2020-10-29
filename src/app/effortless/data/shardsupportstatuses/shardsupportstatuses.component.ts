import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardSupportStatuseDialogComponent } from './shardsupportstatuse-dialog/shardsupportstatuse-dialog.component'

@Component({
  selector: 'eapi-data-shardsupportstatuses',
  templateUrl: './shardsupportstatuses.component.html',
  styleUrls: ['./shardsupportstatuses.component.scss']
})
export class ShardSupportStatusesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shardsupportstatuses: any[] = [];
  filteredShardSupportStatuses: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardSupportStatusesChange().subscribe(shardsupportstatuses => {
      this.shardsupportstatuses = shardsupportstatuses;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShardSupportStatuses = this.shardsupportstatuses.filter(shardsupportstatuse => !this.searchText || shardsupportstatuse.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShardSupportStatuses(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShardSupportStatuse(id) {
    this.router.navigateByUrl('effortless/data/shardsupportstatuses/shardsupportstatuse/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardSupportStatuseDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShardSupportStatuse(shardsupportstatuseToDelete) {
    var payload = this.gds.createPayload();
    payload.ShardSupportStatuse = shardsupportstatuseToDelete;
    this.gds.smqUser.DeleteShardSupportStatuse(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShardSupportStatuse(shardsupportstatuseToAdd) {
    var payload = this.gds.createPayload();
    payload.ShardSupportStatuse = shardsupportstatuseToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShardSupportStatuse(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shardsupportstatuses/shardsupportstatuse/' + reply.ShardSupportStatuse.ShardSupportStatuseId);
      }
    });
  }
}

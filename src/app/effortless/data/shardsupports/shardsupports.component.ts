import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardSupportDialogComponent } from './shardsupport-dialog/shardsupport-dialog.component'

@Component({
  selector: 'eapi-data-shardsupports',
  templateUrl: './shardsupports.component.html',
  styleUrls: ['./shardsupports.component.scss']
})
export class ShardSupportsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shardsupports: any[] = [];
  filteredShardSupports: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardSupportsChange().subscribe(shardsupports => {
      this.shardsupports = shardsupports;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShardSupports = this.shardsupports.filter(shardsupport => !this.searchText || shardsupport.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShardSupports(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShardSupport(id) {
    this.router.navigateByUrl('effortless/data/shardsupports/shardsupport/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardSupportDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShardSupport(shardsupportToDelete) {
    var payload = this.gds.createPayload();
    payload.ShardSupport = shardsupportToDelete;
    this.gds.smqUser.DeleteShardSupport(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShardSupport(shardsupportToAdd) {
    var payload = this.gds.createPayload();
    payload.ShardSupport = shardsupportToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShardSupport(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shardsupports/shardsupport/' + reply.ShardSupport.ShardSupportId);
      }
    });
  }
}

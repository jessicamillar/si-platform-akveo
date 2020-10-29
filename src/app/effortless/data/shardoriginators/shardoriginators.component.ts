import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardOriginatorDialogComponent } from './shardoriginator-dialog/shardoriginator-dialog.component'

@Component({
  selector: 'eapi-data-shardoriginators',
  templateUrl: './shardoriginators.component.html',
  styleUrls: ['./shardoriginators.component.scss']
})
export class ShardOriginatorsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shardoriginators: any[] = [];
  filteredShardOriginators: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardOriginatorsChange().subscribe(shardoriginators => {
      this.shardoriginators = shardoriginators;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShardOriginators = this.shardoriginators.filter(shardoriginator => !this.searchText || shardoriginator.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShardOriginators(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShardOriginator(id) {
    this.router.navigateByUrl('effortless/data/shardoriginators/shardoriginator/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardOriginatorDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShardOriginator(shardoriginatorToDelete) {
    var payload = this.gds.createPayload();
    payload.ShardOriginator = shardoriginatorToDelete;
    this.gds.smqUser.DeleteShardOriginator(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShardOriginator(shardoriginatorToAdd) {
    var payload = this.gds.createPayload();
    payload.ShardOriginator = shardoriginatorToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShardOriginator(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shardoriginators/shardoriginator/' + reply.ShardOriginator.ShardOriginatorId);
      }
    });
  }
}

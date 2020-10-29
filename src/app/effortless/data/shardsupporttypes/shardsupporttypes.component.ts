import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShardSupportTypeDialogComponent } from './shardsupporttype-dialog/shardsupporttype-dialog.component'

@Component({
  selector: 'eapi-data-shardsupporttypes',
  templateUrl: './shardsupporttypes.component.html',
  styleUrls: ['./shardsupporttypes.component.scss']
})
export class ShardSupportTypesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  shardsupporttypes: any[] = [];
  filteredShardSupportTypes: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onShardSupportTypesChange().subscribe(shardsupporttypes => {
      this.shardsupporttypes = shardsupporttypes;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredShardSupportTypes = this.shardsupporttypes.filter(shardsupporttype => !this.searchText || shardsupporttype.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadShardSupportTypes(self.gds.smqUser || self.gds.smqGuest);
  }

  goToShardSupportType(id) {
    this.router.navigateByUrl('effortless/data/shardsupporttypes/shardsupporttype/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ShardSupportTypeDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteShardSupportType(shardsupporttypeToDelete) {
    var payload = this.gds.createPayload();
    payload.ShardSupportType = shardsupporttypeToDelete;
    this.gds.smqUser.DeleteShardSupportType(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addShardSupportType(shardsupporttypeToAdd) {
    var payload = this.gds.createPayload();
    payload.ShardSupportType = shardsupporttypeToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddShardSupportType(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/shardsupporttypes/shardsupporttype/' + reply.ShardSupportType.ShardSupportTypeId);
      }
    });
  }
}

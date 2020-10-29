import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { GreatEightDialogComponent } from './greateight-dialog/greateight-dialog.component'

@Component({
  selector: 'eapi-data-greateights',
  templateUrl: './greateights.component.html',
  styleUrls: ['./greateights.component.scss']
})
export class GreatEightsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  greateights: any[] = [];
  filteredGreatEights: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onGreatEightsChange().subscribe(greateights => {
      this.greateights = greateights;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredGreatEights = this.greateights.filter(greateight => !this.searchText || greateight.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadGreatEights(self.gds.smqUser || self.gds.smqGuest);
  }

  goToGreatEight(id) {
    this.router.navigateByUrl('effortless/data/greateights/greateight/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(GreatEightDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteGreatEight(greateightToDelete) {
    var payload = this.gds.createPayload();
    payload.GreatEight = greateightToDelete;
    this.gds.smqUser.DeleteGreatEight(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addGreatEight(greateightToAdd) {
    var payload = this.gds.createPayload();
    payload.GreatEight = greateightToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddGreatEight(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/greateights/greateight/' + reply.GreatEight.GreatEightId);
      }
    });
  }
}

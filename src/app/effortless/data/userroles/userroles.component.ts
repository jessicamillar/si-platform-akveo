import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { UserRoleDialogComponent } from './userrole-dialog/userrole-dialog.component'

@Component({
  selector: 'eapi-data-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserRolesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  userroles: any[] = [];
  filteredUserRoles: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onUserRolesChange().subscribe(userroles => {
      this.userroles = userroles;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredUserRoles = this.userroles.filter(userrole => !this.searchText || userrole.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadUserRoles(self.gds.smqUser || self.gds.smqGuest);
  }

  goToUserRole(id) {
    this.router.navigateByUrl('effortless/data/userroles/userrole/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(UserRoleDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteUserRole(userroleToDelete) {
    var payload = this.gds.createPayload();
    payload.UserRole = userroleToDelete;
    this.gds.smqUser.DeleteUserRole(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addUserRole(userroleToAdd) {
    var payload = this.gds.createPayload();
    payload.UserRole = userroleToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddUserRole(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/userroles/userrole/' + reply.UserRole.UserRoleId);
      }
    });
  }
}

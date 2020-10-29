import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { OrganizationDialogComponent } from './organization-dialog/organization-dialog.component'

@Component({
  selector: 'eapi-data-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  organizations: any[] = [];
  filteredOrganizations: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onOrganizationsChange().subscribe(organizations => {
      this.organizations = organizations;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredOrganizations = this.organizations.filter(organization => !this.searchText || organization.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadOrganizations(self.gds.smqUser || self.gds.smqGuest);
  }

  goToOrganization(id) {
    this.router.navigateByUrl('effortless/data/organizations/organization/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(OrganizationDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteOrganization(organizationToDelete) {
    var payload = this.gds.createPayload();
    payload.Organization = organizationToDelete;
    this.gds.smqUser.DeleteOrganization(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addOrganization(organizationToAdd) {
    var payload = this.gds.createPayload();
    payload.Organization = organizationToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddOrganization(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/organizations/organization/' + reply.Organization.OrganizationId);
      }
    });
  }
}

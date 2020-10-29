import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ModuleDialogComponent } from './module-dialog/module-dialog.component'

@Component({
  selector: 'eapi-data-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  modules: any[] = [];
  filteredModules: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onModulesChange().subscribe(modules => {
      this.modules = modules;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredModules = this.modules.filter(module => !this.searchText || module.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadModules(self.gds.smqUser || self.gds.smqGuest);
  }

  goToModule(id) {
    this.router.navigateByUrl('effortless/data/modules/module/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ModuleDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteModule(moduleToDelete) {
    var payload = this.gds.createPayload();
    payload.Module = moduleToDelete;
    this.gds.smqUser.DeleteModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addModule(moduleToAdd) {
    var payload = this.gds.createPayload();
    payload.Module = moduleToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/modules/module/' + reply.Module.ModuleId);
      }
    });
  }
}

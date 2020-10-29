import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { VibrationalCategoryDialogComponent } from './vibrationalcategory-dialog/vibrationalcategory-dialog.component'

@Component({
  selector: 'eapi-data-vibrationalcategories',
  templateUrl: './vibrationalcategories.component.html',
  styleUrls: ['./vibrationalcategories.component.scss']
})
export class VibrationalCategoriesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  vibrationalcategories: any[] = [];
  filteredVibrationalCategories: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onVibrationalCategoriesChange().subscribe(vibrationalcategories => {
      this.vibrationalcategories = vibrationalcategories;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredVibrationalCategories = this.vibrationalcategories.filter(vibrationalcategory => !this.searchText || vibrationalcategory.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadVibrationalCategories(self.gds.smqUser || self.gds.smqGuest);
  }

  goToVibrationalCategory(id) {
    this.router.navigateByUrl('effortless/data/vibrationalcategories/vibrationalcategory/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(VibrationalCategoryDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteVibrationalCategory(vibrationalcategoryToDelete) {
    var payload = this.gds.createPayload();
    payload.VibrationalCategory = vibrationalcategoryToDelete;
    this.gds.smqUser.DeleteVibrationalCategory(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addVibrationalCategory(vibrationalcategoryToAdd) {
    var payload = this.gds.createPayload();
    payload.VibrationalCategory = vibrationalcategoryToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddVibrationalCategory(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/vibrationalcategories/vibrationalcategory/' + reply.VibrationalCategory.VibrationalCategoryId);
      }
    });
  }
}

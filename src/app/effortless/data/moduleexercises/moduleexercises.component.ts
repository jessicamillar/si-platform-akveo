import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ModuleExerciseDialogComponent } from './moduleexercise-dialog/moduleexercise-dialog.component'

@Component({
  selector: 'eapi-data-moduleexercises',
  templateUrl: './moduleexercises.component.html',
  styleUrls: ['./moduleexercises.component.scss']
})
export class ModuleExercisesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  moduleexercises: any[] = [];
  filteredModuleExercises: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onModuleExercisesChange().subscribe(moduleexercises => {
      this.moduleexercises = moduleexercises;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredModuleExercises = this.moduleexercises.filter(moduleexercise => !this.searchText || moduleexercise.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadModuleExercises(self.gds.smqUser || self.gds.smqGuest);
  }

  goToModuleExercise(id) {
    this.router.navigateByUrl('effortless/data/moduleexercises/moduleexercise/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ModuleExerciseDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteModuleExercise(moduleexerciseToDelete) {
    var payload = this.gds.createPayload();
    payload.ModuleExercise = moduleexerciseToDelete;
    this.gds.smqUser.DeleteModuleExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addModuleExercise(moduleexerciseToAdd) {
    var payload = this.gds.createPayload();
    payload.ModuleExercise = moduleexerciseToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddModuleExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/moduleexercises/moduleexercise/' + reply.ModuleExercise.ModuleExerciseId);
      }
    });
  }
}

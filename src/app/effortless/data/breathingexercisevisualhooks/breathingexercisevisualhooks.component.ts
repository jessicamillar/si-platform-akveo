import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { BreathingExerciseVisualHookDialogComponent } from './breathingexercisevisualhook-dialog/breathingexercisevisualhook-dialog.component'

@Component({
  selector: 'eapi-data-breathingexercisevisualhooks',
  templateUrl: './breathingexercisevisualhooks.component.html',
  styleUrls: ['./breathingexercisevisualhooks.component.scss']
})
export class BreathingExerciseVisualHooksComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  breathingexercisevisualhooks: any[] = [];
  filteredBreathingExerciseVisualHooks: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onBreathingExerciseVisualHooksChange().subscribe(breathingexercisevisualhooks => {
      this.breathingexercisevisualhooks = breathingexercisevisualhooks;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredBreathingExerciseVisualHooks = this.breathingexercisevisualhooks.filter(breathingexercisevisualhook => !this.searchText || breathingexercisevisualhook.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadBreathingExerciseVisualHooks(self.gds.smqUser || self.gds.smqGuest);
  }

  goToBreathingExerciseVisualHook(id) {
    this.router.navigateByUrl('effortless/data/breathingexercisevisualhooks/breathingexercisevisualhook/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(BreathingExerciseVisualHookDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteBreathingExerciseVisualHook(breathingexercisevisualhookToDelete) {
    var payload = this.gds.createPayload();
    payload.BreathingExerciseVisualHook = breathingexercisevisualhookToDelete;
    this.gds.smqUser.DeleteBreathingExerciseVisualHook(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addBreathingExerciseVisualHook(breathingexercisevisualhookToAdd) {
    var payload = this.gds.createPayload();
    payload.BreathingExerciseVisualHook = breathingexercisevisualhookToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddBreathingExerciseVisualHook(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/breathingexercisevisualhooks/breathingexercisevisualhook/' + reply.BreathingExerciseVisualHook.BreathingExerciseVisualHookId);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ExerciseVibrationDialogComponent } from './exercisevibration-dialog/exercisevibration-dialog.component'

@Component({
  selector: 'eapi-data-exercisevibrations',
  templateUrl: './exercisevibrations.component.html',
  styleUrls: ['./exercisevibrations.component.scss']
})
export class ExerciseVibrationsComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  exercisevibrations: any[] = [];
  filteredExerciseVibrations: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onExerciseVibrationsChange().subscribe(exercisevibrations => {
      this.exercisevibrations = exercisevibrations;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredExerciseVibrations = this.exercisevibrations.filter(exercisevibration => !this.searchText || exercisevibration.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadExerciseVibrations(self.gds.smqUser || self.gds.smqGuest);
  }

  goToExerciseVibration(id) {
    this.router.navigateByUrl('effortless/data/exercisevibrations/exercisevibration/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ExerciseVibrationDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteExerciseVibration(exercisevibrationToDelete) {
    var payload = this.gds.createPayload();
    payload.ExerciseVibration = exercisevibrationToDelete;
    this.gds.smqUser.DeleteExerciseVibration(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addExerciseVibration(exercisevibrationToAdd) {
    var payload = this.gds.createPayload();
    payload.ExerciseVibration = exercisevibrationToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddExerciseVibration(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/exercisevibrations/exercisevibration/' + reply.ExerciseVibration.ExerciseVibrationId);
      }
    });
  }
}

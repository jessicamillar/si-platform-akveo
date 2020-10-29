import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component'

@Component({
  selector: 'eapi-data-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  exercises: any[] = [];
  filteredExercises: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onExercisesChange().subscribe(exercises => {
      this.exercises = exercises;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredExercises = this.exercises.filter(exercise => !this.searchText || exercise.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadExercises(self.gds.smqUser || self.gds.smqGuest);
  }

  goToExercise(id) {
    this.router.navigateByUrl('effortless/data/exercises/exercise/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ExerciseDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteExercise(exerciseToDelete) {
    var payload = this.gds.createPayload();
    payload.Exercise = exerciseToDelete;
    this.gds.smqUser.DeleteExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addExercise(exerciseToAdd) {
    var payload = this.gds.createPayload();
    payload.Exercise = exerciseToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddExercise(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/exercises/exercise/' + reply.Exercise.ExerciseId);
      }
    });
  }
}

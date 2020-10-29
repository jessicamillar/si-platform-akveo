import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ExerciseLikeDialogComponent } from './exerciselike-dialog/exerciselike-dialog.component'

@Component({
  selector: 'eapi-data-exerciselikes',
  templateUrl: './exerciselikes.component.html',
  styleUrls: ['./exerciselikes.component.scss']
})
export class ExerciseLikesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  exerciselikes: any[] = [];
  filteredExerciseLikes: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onExerciseLikesChange().subscribe(exerciselikes => {
      this.exerciselikes = exerciselikes;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredExerciseLikes = this.exerciselikes.filter(exerciselike => !this.searchText || exerciselike.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadExerciseLikes(self.gds.smqUser || self.gds.smqGuest);
  }

  goToExerciseLike(id) {
    this.router.navigateByUrl('effortless/data/exerciselikes/exerciselike/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ExerciseLikeDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteExerciseLike(exerciselikeToDelete) {
    var payload = this.gds.createPayload();
    payload.ExerciseLike = exerciselikeToDelete;
    this.gds.smqUser.DeleteExerciseLike(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addExerciseLike(exerciselikeToAdd) {
    var payload = this.gds.createPayload();
    payload.ExerciseLike = exerciselikeToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddExerciseLike(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/exerciselikes/exerciselike/' + reply.ExerciseLike.ExerciseLikeId);
      }
    });
  }
}

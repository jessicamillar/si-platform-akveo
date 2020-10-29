import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ExerciseFavoriteDialogComponent } from './exercisefavorite-dialog/exercisefavorite-dialog.component'

@Component({
  selector: 'eapi-data-exercisefavorites',
  templateUrl: './exercisefavorites.component.html',
  styleUrls: ['./exercisefavorites.component.scss']
})
export class ExerciseFavoritesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  exercisefavorites: any[] = [];
  filteredExerciseFavorites: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onExerciseFavoritesChange().subscribe(exercisefavorites => {
      this.exercisefavorites = exercisefavorites;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredExerciseFavorites = this.exercisefavorites.filter(exercisefavorite => !this.searchText || exercisefavorite.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadExerciseFavorites(self.gds.smqUser || self.gds.smqGuest);
  }

  goToExerciseFavorite(id) {
    this.router.navigateByUrl('effortless/data/exercisefavorites/exercisefavorite/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(ExerciseFavoriteDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteExerciseFavorite(exercisefavoriteToDelete) {
    var payload = this.gds.createPayload();
    payload.ExerciseFavorite = exercisefavoriteToDelete;
    this.gds.smqUser.DeleteExerciseFavorite(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addExerciseFavorite(exercisefavoriteToAdd) {
    var payload = this.gds.createPayload();
    payload.ExerciseFavorite = exercisefavoriteToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddExerciseFavorite(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/exercisefavorites/exercisefavorite/' + reply.ExerciseFavorite.ExerciseFavoriteId);
      }
    });
  }
}

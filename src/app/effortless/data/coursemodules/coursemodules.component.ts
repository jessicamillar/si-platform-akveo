import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { CourseModuleDialogComponent } from './coursemodule-dialog/coursemodule-dialog.component'

@Component({
  selector: 'eapi-data-coursemodules',
  templateUrl: './coursemodules.component.html',
  styleUrls: ['./coursemodules.component.scss']
})
export class CourseModulesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  coursemodules: any[] = [];
  filteredCourseModules: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onCourseModulesChange().subscribe(coursemodules => {
      this.coursemodules = coursemodules;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredCourseModules = this.coursemodules.filter(coursemodule => !this.searchText || coursemodule.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadCourseModules(self.gds.smqUser || self.gds.smqGuest);
  }

  goToCourseModule(id) {
    this.router.navigateByUrl('effortless/data/coursemodules/coursemodule/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(CourseModuleDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteCourseModule(coursemoduleToDelete) {
    var payload = this.gds.createPayload();
    payload.CourseModule = coursemoduleToDelete;
    this.gds.smqUser.DeleteCourseModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addCourseModule(coursemoduleToAdd) {
    var payload = this.gds.createPayload();
    payload.CourseModule = coursemoduleToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddCourseModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/coursemodules/coursemodule/' + reply.CourseModule.CourseModuleId);
      }
    });
  }
}

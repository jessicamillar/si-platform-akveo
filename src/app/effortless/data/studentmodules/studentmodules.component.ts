import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { StudentModuleDialogComponent } from './studentmodule-dialog/studentmodule-dialog.component'

@Component({
  selector: 'eapi-data-studentmodules',
  templateUrl: './studentmodules.component.html',
  styleUrls: ['./studentmodules.component.scss']
})
export class StudentModulesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  studentmodules: any[] = [];
  filteredStudentModules: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onStudentModulesChange().subscribe(studentmodules => {
      this.studentmodules = studentmodules;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredStudentModules = this.studentmodules.filter(studentmodule => !this.searchText || studentmodule.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadStudentModules(self.gds.smqUser || self.gds.smqGuest);
  }

  goToStudentModule(id) {
    this.router.navigateByUrl('effortless/data/studentmodules/studentmodule/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(StudentModuleDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteStudentModule(studentmoduleToDelete) {
    var payload = this.gds.createPayload();
    payload.StudentModule = studentmoduleToDelete;
    this.gds.smqUser.DeleteStudentModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addStudentModule(studentmoduleToAdd) {
    var payload = this.gds.createPayload();
    payload.StudentModule = studentmoduleToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddStudentModule(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/studentmodules/studentmodule/' + reply.StudentModule.StudentModuleId);
      }
    });
  }
}

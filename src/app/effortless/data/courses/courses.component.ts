import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { EffortlessComponentBase } from '../../efforless-base-component';
import { GDS } from '../../services/gds.service';
import { DataEndpoint } from '../../services/eapi-data-services/data-endpoint/data-endpoint';
import { NbMenuService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { CourseDialogComponent } from './course-dialog/course-dialog.component'

@Component({
  selector: 'eapi-data-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent extends EffortlessComponentBase implements OnInit {
  searchText : string = '';
  courses: any[] = [];
  filteredCourses: any;

  constructor(public gds : GDS, public data : DataEndpoint, public route : ActivatedRoute, 
            protected menuService : NbMenuService, public router : Router, public dialogService: NbDialogService) { 
    super(gds, data, menuService);
    this.safeSubscribe(this.data.onCoursesChange().subscribe(courses => {
      this.courses = courses;
      this.filterNow();
    }));
  }

  onGdsReady() {
    this.reload(this);
  }

  filterNow() {
    this.filteredCourses = this.courses.filter(course => !this.searchText || course.Name.toLowerCase().includes((this.searchText + '').toLowerCase()));      
  }

  reload(self: this) {
    self.data.reloadCourses(self.gds.smqUser || self.gds.smqGuest);
  }

  goToCourse(id) {
    this.router.navigateByUrl('effortless/data/courses/course/' + id);
  }

  
  openAddDialog() {
    this.dialogService.open(CourseDialogComponent, { context: null, autoFocus: false});
  }

  goBack() {
    this.router.navigateByUrl('effortless/data');
  }

  deleteCourse(courseToDelete) {
    var payload = this.gds.createPayload();
    payload.Course = courseToDelete;
    this.gds.smqUser.DeleteCourse(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.reload(this)
      }
    })
  }
   
  addCourse(courseToAdd) {
    var payload = this.gds.createPayload();
    payload.Course = courseToAdd;
    (this.gds.smqUser || this.gds.smqGuest).AddCourse(payload).then((reply) => {
      if (reply.ErrorMessage) {
        alert(reply.ErrorMessage)
      } else {
        this.router.navigateByUrl('effortless/data/courses/course/' + reply.Course.CourseId);
      }
    });
  }
}

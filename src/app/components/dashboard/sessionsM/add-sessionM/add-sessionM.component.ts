import { Component, OnInit } from "@angular/core";
import { SessionsMService } from "app/services/sessionsM.service";
import { LecturersService } from "app/services/lecturers.service";
import { SubjectsService } from "app/services/subjects.service";
import { TagsService } from "app/services/tags.service";
import { BatchesService } from "app/services/batches.service";
import { BuildingService } from "app/services/building.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: "app-add-session",
  templateUrl: "./add-sessionM.component.html",
  styleUrls: ["./add-sessionM.component.scss"],
})
export class AddSessionMComponent implements OnInit {
  public lecturers: [];
  public subjects: [];
  public tags: [];
  public maingroups: [];
  public subgroups: [];
  
  //public batches: [];

  public selectedLecturer: string;
  public selectedSubject: string;
  public selectedTag: string;
  public selectedGroup: string;
  public selectedbuilding: string;
  //public selectedBatch: string;
  public studentCount: string;
  public duration: string;
  public id: string;
  public isOnUpdate: boolean;

  constructor(
    private sessionsMService: SessionsMService,
    private lecturersService: LecturersService,
    private subjectsService: SubjectsService,
    private tagsService: TagsService,
    private batchesService: BatchesService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddSessionMComponent>
  ) {}

  ngOnInit(): void {
    this.viewAllLecturers();
    this.viewAllSubjects();
    this.viewAllMainGroups();
    this.viewAllSubGroups();
    this.viewAllTags();

    this.selectedLecturer = "";
    this.selectedSubject = "";
    this.selectedTag = "";
    this.selectedGroup = "";
    this.selectedbuilding = "";
    //this.selectedBatch = "";
    this.studentCount = "";
    this.duration = "";

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.sessionsMService
          .viewSessionsById(params.id)
          .subscribe((res: { data: any }) => {
            this.id = params.id;
            this.selectedLecturer = res.data.selectedLecturer;
            this.selectedSubject = res.data.selectedSubject;
            this.selectedTag = res.data.selectedTag;
            this.selectedGroup = res.data.selectedGroup;
            this.selectedbuilding = res.data.selectedbuilding;
            //this.selectedBatch = res.data.selectedBatch;
            this.studentCount = res.data.studentCount;
            this.duration = res.data.duration;
            this.isOnUpdate = true;
          });
      }
    });
  }

  

  createSession() {
    this.sessionsMService
      .addSession(
        this.selectedLecturer,
        this.selectedSubject,
        this.selectedTag,
        this.selectedGroup,
        this.selectedbuilding,
        this.studentCount,
        this.duration
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/sessionsM/manage']);
          this.alertService.showAlert('Success!', 'Reload the Session to view!', 'success');
          
      }, err => {
        this.alertService.showAlert('Unsuccessful', '', { duration: 2000 });
        console.log(err.message);
      });

      
      
    this.clear();{
    this.dialogRef.close(this.duration);
  }
  }

  updateSession() {
    this.sessionsMService
      .updateSessionsById(this.id, {
        selectedLecturer: this.selectedLecturer,
        selectedSubject: this.selectedSubject,
        selectedTag: this.selectedTag,
        selectedMainGroup: this.selectedGroup,
        selectedbuilding: this.selectedbuilding,
        //selectedBatch: this.selectedBatch,
        studentCount: this.studentCount,
        duration: this.duration,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.open("Session details are successfully updated", null, {
            duration: 2000,
          });
          this.router.navigate(['/sessionsM/manage']);
        },
        (err) => {
          this.snackbar.open("Unsuccessfull", null, { duration: 2000 });
          console.log(err.message);
        }
      );
  }

  clear() {
    this.selectedLecturer = "";
    this.selectedSubject = "";
    this.selectedTag = "";
    this.selectedGroup = "";
    this.selectedbuilding = "";
    //this.selectedBatch = "";
    this.studentCount = "";
    this.duration = "";
  }

  viewAllLecturers() {
    this.lecturersService.viewLecturers().subscribe((res: { data: any }) => {
      this.lecturers = res.data;
    });
  }

  viewAllSubjects() {
    this.subjectsService.viewSubjects().subscribe((res: { data: any }) => {
      this.subjects = res.data;
    });
  }

  viewAllTags() {
    this.tagsService.viewTags().subscribe((res: { data: any }) => {
      this.tags = res.data;
    });
  }

  viewAllMainGroups() {
    this.batchesService.viewMainGroups().subscribe((res: { data: any }) => {
      this.maingroups = res.data;
    });
  }

  viewAllSubGroups() {
    this.batchesService.viewSubGroups().subscribe((res: { data: any }) => {
      this.subgroups = res.data;
    });
  }
  
  public closeDialog() {
    this.dialogRef.close();
  }

  viewAllSessions() {
    this.router.navigate(['/sessionsM/manage']);
  }
}

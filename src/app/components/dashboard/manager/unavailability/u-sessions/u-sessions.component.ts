import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionsService } from 'app/services/sessions.service';
import { UnavailabilityService } from 'app/services/unavailability.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

interface APIResponse {
  success: boolean,
  data: any
}

@Component({
  selector: 'app-u-sessions',
  templateUrl: './u-sessions.component.html',
  styleUrls: ['./u-sessions.component.scss']
})
export class USessionsComponent implements OnInit {

  public sessions: [];
  public sessions2: [];
  public dataSourseArray: [];
  public SelectedLecturersArray: [];
  public sessionId: string;
  public day: string;
  public startTime: string;
  public endTime: string;
  public isOnUpdate: boolean;

  displayedColumns = ['sessions','day','startTime','endTime'];  
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private sessionsService: SessionsService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private unavailabilityService: UnavailabilityService
  ) { }

  ngOnInit(): void {
    this.sessionId = "";
    this.day = "";
    this.startTime = "";
    this.endTime = "";
    this.viewAllSessions();
    this.viewAllSessions2();

    this.route.queryParams.subscribe(params => {
      if(params.id) {
        this.unavailabilityService.viewUnavailabilitysById(params.id).subscribe((res: {data: any}) => {
          this.sessionId = params.sessionId;
          this.sessions = res.data.sessions;
          this.isOnUpdate = true;
        });
      }
    });
  }

  viewAllSessions() {
    this.unavailabilityService.viewUnavailabilitys().subscribe((response: APIResponse) => {
   
      this.dataSource = new MatTableDataSource(response.data);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
    });

  }

  

  viewAllSessions2() {
    this.unavailabilityService.viewAllSessions().subscribe((res: {data: any}) => {
      this.sessions2 = res.data;
      // console.log(this.sessions2);
    });
  }

  save() {
    console.log(this.sessionId);
    this.unavailabilityService.addSessionUnavailability(this.sessionId,this.day,this.startTime,this.endTime).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.open("Constraint: Unavailability of session is added successfully", "" , {
          duration: 2000,
        });
        this.clear();
        this.viewAllSessions();
      },
      (err) => {
        this.snackbar.open("Constraint: Unavailability of session is adding not successful", "", {
          duration: 2000,
        });
        console.log(err.message);
      }
    );
  }

  clear() {
    this.day = "";
    this.startTime = "";
    this.endTime = "";
  }

}

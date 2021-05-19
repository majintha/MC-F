import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturersService } from 'app/services/lecturers.service';
import { UnavailabilityService } from 'app/services/unavailability.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';



interface APIResponse {
  success: boolean,
  data: any
}

@Component({
  selector: 'app-u-lecturers',
  templateUrl: './u-lecturers.component.html',
  styleUrls: ['./u-lecturers.component.scss']
})
export class ULecturersComponent implements OnInit {

  public lecturers: [];
  public lecturers2: [];
  public lecturerId: string;
  public day: string;
  public startTime: string;
  public endTime: string;
  public isOnUpdate: boolean;

  displayedColumns = ['lecturers','day','startTime','endTime','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private lecturersService: LecturersService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private unavailabilityService: UnavailabilityService 
  ) { }

  ngOnInit(): void {
    this.lecturerId = "";
    this.day = "";
    this.startTime = "";
    this.endTime = "";
    this.viewAllLecturers();
    this.viewAllLecturers2();

    this.route.queryParams.subscribe(params => {
      if(params.id) {
        this.unavailabilityService.viewUnavailabilitylById(params.id).subscribe((res: {data: any}) => {
          this.lecturerId = params.lecturerId;
          this.lecturers = res.data.lecturers;
          this.isOnUpdate = true;
        });
      }
    });
  }

  viewAllLecturers() {
    this.unavailabilityService.viewUnavailabilityl().subscribe((response: APIResponse) => {
   
      this.dataSource = new MatTableDataSource(response.data);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
    });

  }

  viewAllLecturers2() {
    this.unavailabilityService.viewAllLecturers().subscribe((res: {data: any}) => {
      this.lecturers2 = res.data;
     // console.log(this.lecturers);
    });
  }

  save() {
    console.log(this.lecturerId);
    this.unavailabilityService.addLecturerUnavailability(this.lecturerId,this.day,this.startTime,this.endTime).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.open("Constraint: Unavailability of lecturer is added successfully", "" , {
          duration: 2000,
        });
        this.clear();
        this.viewAllLecturers();
      },
      (err) => {
        this.snackbar.open("Constraint: Unavailability of lecturer is adding not successful", "", {
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
  openDialog(_id: string) {
    const dialogRef = this.dialog.open(DeleteDialogBox13);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProgramme(_id);
      }
    });
  }

  deleteProgramme(id: String) {
    this.unavailabilityService.deleteunavailabilitylById(id).subscribe(response => {
      console.log(response);
      this.viewAllLecturers();
    },err => {
      console.log(err.message);
    });
  }
}

@Component({
  selector: 'dialogBox',
  templateUrl: 'dialogBox1.html',
})
export class DeleteDialogBox13 {
  constructor() {}

  public deleteProgramme() {}

}

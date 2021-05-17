import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SessionsService } from "app/services/sessions.service";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddSessionMComponent } from "../add-sessionM/add-sessionM.component";

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: "app-manage-sessions",
  templateUrl: "./manage-sessionsM.component.html",
  styleUrls: ["./manage-sessionsM.component.scss"],
})
export class ManageSessionsMComponent implements OnInit {
  displayedColumns = [
    "selectedLecName",
    "selectedSubName",
    "selectedTag",
    "selectedGroup",
    "selectedbuilding",
    "studentCount",
    "duration",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  private loading: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private sessionsService: SessionsService,
    private matDialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.viewAllSessions();
    this.loading = true;
  }
 public openNewSessionModal() {
    const ref = this.matDialog.open(AddSessionMComponent, {
      width: '50%',
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
      
        this.loading = true;


      }
      
      this.viewAllSessions();
      console.log("closed...");
    })
  }
  private filterPredicate = (data, filter: string) => {
    const accumulator = (currentTerm, key) => {
      return this.nestedFilterCheck(currentTerm, data, key);
    };
    const dataStr = Object.keys(data).reduce(accumulator, "").toLowerCase();
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  };

  private nestedFilterCheck(applyFilter, data, key) {
    if (typeof data[key] === "object") {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          applyFilter = this.nestedFilterCheck(applyFilter, data[key], k);
        }
      }
    } else {
      applyFilter += data[key];
    }
    return applyFilter;
  }

  applyFilter(keyword) {
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  viewAllSessions() {
    this.sessionsService.viewSessions().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.filterPredicate = this.filterPredicate;
      this.dataSource.sort = this.sort;
    });
  }

  deleteLecturer(id: String){
    this.sessionsService.deleteSessionsById(id).subscribe(response => {
      console.log(response);
      this.snackBar.open('Details are successfully deleted', null, { duration : 2000});
      this.viewAllSessions();
      
    }, err => {
      this.snackBar.open('Details could not be deleted', null, { duration : 3000});
      console.log(err.message);
    });
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SessionsService } from "app/services/sessions.service";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from '@angular/material/snack-bar';

interface APIResponse {
  success: boolean;
  data: any;
}

@Component({
  selector: "app-manage-sessions",
  templateUrl: "./manage-sessions.component.html",
  styleUrls: ["./manage-sessions.component.scss"],
})
export class ManageSessionsComponent implements OnInit {
  displayedColumns = [
    "selectedLecName",
    "selectedSubName",
    "selectedTag",
    "selectedGroup",
    "studentCount",
    "duration",
    "action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private sessionsService: SessionsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewAllSessions();
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

  updateSession(id: String) {
    this.router.navigate(['/sessions/add'], { queryParams: { id } });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LecturersService } from 'app/services/lecturers.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'app/services/alert.service';
import { Lecturer } from 'app/models/lecturer.model';

interface APIResponse {
  success: boolean,
  data: any
}

@Component({
  selector: 'app-manage-lec',
  templateUrl: './manage-lec.component.html',
  styleUrls: ['./manage-lec.component.scss']
})
export class ManageLecComponent implements OnInit {

  displayedColumns = ['lecId', 'lecName', 'lecCenter', 'lecFaculty', 'lecDepartment', 'lecBuilding', 'lecLevel', 'lecRank', 'action'];
  dataSource: MatTableDataSource<any>;
  private loading: boolean;


  private _id: string;
  private rank: string;
  private empid: string;
  private fname: string;
  private lname: string;
  // private email: string;
  private faculty: string;
  private department: string;
  private center: string;
  private building: string;
  private level: string;
  private id: string;
  private lecturers: [];

  constructor(
    private lecturersService: LecturersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this._id = '';
    this.empid = '';
    this.rank = '';
    this.fname = '';
    this.lname = '';
    this.viewAllLecturers();
  }

  viewAllLecturers() {
    this.lecturersService.viewLecturers().subscribe((res: APIResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
    })
  }

  updateLecturer(id: String) {
    this.router.navigate(['/lecturers/add'], { queryParams: { id } });
  }

  clickMethod(id: String) {
    this.alertService.showConfirm('Are you sure?',
      id ?
        `This will delete the Lecturer` :
        `This deletion is not reversible!`).then(result => {
          if (result.value) {
            this.loading = true;
            this.lecturersService.deleteLecturerById(id).subscribe((response: APIResponse) => {
              if (response.success) {
                this.alertService.showAlert('Deleted!',
                  id ?
                    `Lecturer was delete successfully from the system` :
                    `Lecturer was delete successfully`, 'success');
                this.viewAllLecturers();
              }
            });
          }
        })

  }

}

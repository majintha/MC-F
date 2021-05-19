import { SubjectsService } from 'app/services/subjects.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchesService } from 'app/services/batches.service';
import { UnavailabilityService } from 'app/services/unavailability.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

interface APIResponse {
  success : boolean,
  data : any
}

@Component({
  selector: 'app-non-overlapping-s',
  templateUrl: './non-overlapping-s.component.html',
  styleUrls: ['./non-overlapping-s.component.scss']
})
export class NonOverlappingSComponent implements OnInit {

  public subject1: string;
  public subject: string;
  public batches: [];
  public batches2: [];
  public batchId: string;
  public day: string;
  public startTime: string;
  public endTime: string;
  public isOnUpdate: boolean;

  displayedColumns = ['subject','day','startTime','endTime'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private snackbar: MatSnackBar,
    private batchesService: BatchesService,
    private route: ActivatedRoute,
    private unavailabilityService: UnavailabilityService
  ) { }

  ngOnInit(): void {

    this.batchId = "";
    this.subject = "";
    this.day = "";
    this.startTime = "";
    this.endTime = "";
    this.viewAllBatches();
    this.viewAllBatches2();

    this.route.queryParams.subscribe(params => {
      if(params.id) {
        this.unavailabilityService.viewUnavailabilitybById(params.id).subscribe((res: {data: any}) => {
          this.batchId = params.batchId;
          this.batches = res.data.batches;
          this.isOnUpdate = true;
        });
      }
    });
  }

  viewAllBatches() {
    this.unavailabilityService.viewUnavailabilityb().subscribe((response: APIResponse) => {
   
      this.dataSource = new MatTableDataSource(response.data);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
    });

  }
  

  viewAllBatches2() {
    this.unavailabilityService.viewAllBatchs().subscribe((res: {data: any}) => {
      this.batches2 = res.data;
     // console.log(this.batches);
    });
  }

  save() {
    console.log(this.batchId);
    this.unavailabilityService.addBatchUnavailability(this.subject1,this.subject,this.batchId,this.day,this.startTime,this.endTime).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.open("Constraint: Unavailability of batch is added successfully", "" , {
          duration: 2000,
        });
        this.clear();
        this.viewAllBatches();
      },
      (err) => {
        this.snackbar.open("Constraint: Unavailability of batch is adding not successful", "", {
          duration: 2000,
        });
        console.log(err.message);
      }
    );
  }

  clear() {
    this.subject = "";
    this.day = "";
    this.startTime = "";
    this.endTime = "";
  }
}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
/**
 * @title Table with pagination
 */
 @Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'incident_ID','incident_Title', 'incident_Description', 'incident_Status_Id', 'start_Date', 'closed_Date', 'incident_Location','Action','View','delete'];
  showSearch = false;
  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;

  constructor(private formbuilder:FormBuilder ,
    private router: Router ,private httpService: HttpRequestService) { }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getList();
    }
  getList(){
 this.httpService.getRequest('GET','INCIDENTLIST').subscribe(res=>{
  this.dataArray = res;
  this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
      },(err)=>{
      })
    }
    ngOnDestroy() {
      
    }
    // deleteBCMProgram(id:any){
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.httpService.getRequest('GET','INCIDENTDELETE',`id=${id}`).subscribe(res=>{
    //         if(res==1){
    //           this.toastr.success('Success!', 'Incident management has been deleted successfully');

    //         }
    //         this.getList();
    //       })
          
    //     }
    //   })
    // }
}

export interface IRandomUsers { 
  incident_ID : number;
  incident_Title: string;
  incident_Description: string;
  incident_Status_Id: number;
  start_Date: Date;
  closed_Date: Date;
  incident_Location :string;
  created_By: number;

  created_Date: string;
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
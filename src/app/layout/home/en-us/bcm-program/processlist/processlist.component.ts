import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.scss']
})
export class ProcesslistComponent implements AfterViewInit {
  displayedColumns: string[] = ['bcM_Program_ID', 'bcM_Process_Name','bcM_Program_Name', 'bcM_Project_Name', 'bcM_Process_Status', 'Action', 'View', 'delete'];

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;
  public showSearch: boolean = false;

  constructor(private formbuilder: FormBuilder,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog
  ) { }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.httpService.getRequest('GET', 'LISTBCMPROCESS').subscribe(res => {
      debugger;
      this.dataArray = res;
      console.log("data " +res);
      this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
    })
  }
  ngOnDestroy() {

  }
  // (id:any){
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.httpService.getRequest('GET','DELETEBCMPROGRAM',`id=${id}`).subscribe(res=>{
  //       if(res==1){
  //         this.toastr.success('Success!', 'BCM Program has been deleted successfully');

  //       }
  //       this.getList();
  //     })

  //   }
  // })
  // }
  deleteBCMProgram(user: any): void {
    const dialogRefAdd = this.dialog.open(DeleteDialogComponent, {
      width: '480px',
      maxHeight: '500px',
      autoFocus: false,
      data: {
        userData: user ? user : '',
        ApiType : 'DELETEBCMPROCESS',
        title :'BCM Process'
      }
    });
    this.router.events
      .subscribe(() => {
        dialogRefAdd.close();
      });
    dialogRefAdd.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getList();
      }
    });
  }
}

export interface IRandomUsers {
  bcM_Program_Description: string;
  bcM_Program_Name: string;
  bcM_Program_ID: number;
  bcM_Program_Scoping: number;
  bcM_Program_Status: number;

  created_By: number;

  created_Date: string;
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
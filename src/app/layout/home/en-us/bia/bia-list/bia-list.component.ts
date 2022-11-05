import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExportExcelService } from 'src/app/shared/export.service';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-bia-list',
  templateUrl: './bia-list.component.html',
  styleUrls: ['./bia-list.component.scss']
})
export class BiaListComponent implements AfterViewInit {
  displayedColumns: string[] = ['biA_ID', 'biA_NAME', 'bcM_Program_Name', 'bcM_Project_Name', 'bcM_Process_Name', 'View', 'delete'];
  displayedColumnsPrint: string[] = ['biA_ID', 'biA_NAME', 'bcM_Program_Name', 'bcM_Project_Name', 'bcM_Process_Name', 'status_Name'];

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;
  public showSearch: boolean = false;
  userDetail: any = '';
  public RoleID: number;
  statArray = [];
  remarks = '';
  biaList = [];

  constructor(private exportCSV: ExportExcelService, private formbuilder: FormBuilder,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog
  ) { }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.RoleID = data.role_Id;
    this.getList();
  }
  getList() {
    this.httpService.getRequest('GET', 'BusinessImpactAnalysisList').subscribe(res => {

      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  async exportexcel() {
    this.httpService.getRequest('GET', 'BusinessImpactAnalysisList')
      .subscribe(
        res => {
          this.biaList = [];
          this.biaList = res;
          if (this.biaList.length > 0 || this.biaList.length == 0) {
            this.exportCSV.downloadFile(this.biaList, this.displayedColumnsPrint, 'BIA  List');
          }

          try {

          } catch (error) {

          }

        },
        error => {

        }
      );

  }

  ngOnDestroy() {

  }

  deleteBCMProgram(user: any): void {
    const dialogRefAdd = this.dialog.open(DeleteDialogComponent, {
      width: '480px',
      maxHeight: '500px',
      autoFocus: false,
      data: {
        userData: user ? user : '',
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
  openDialogForView(user) {
    const dialogRefAdd = this.dialog.open(viewDialogClass, {
      width: '600px',
      minHeight: '200px',
      autoFocus: false,
      data: {
        userData: user ? user : '',
      }
    });
    this.router.events
      .subscribe(() => {
        dialogRefAdd.close();
      });
    dialogRefAdd.afterClosed().subscribe((result: any) => {  
      if (result) {
        // this.getList();
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'biaview.component.html',
  styleUrls: ['./bia-list.component.scss']

})
export class viewDialogClass {
  viewData: any
  constructor(
    public dialogRef: MatDialogRef<viewDialogClass>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

  }
  ngOnInit() {
    this.viewData = this.data.userData
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();

  }
}
export interface IProjectList {
  strategy_ID: number;
  strategy_Statement: string;
  strategyDescription: string;
  created_By: number;
  created_Date: Date
}

export interface DialogData {
  strategy_ID: number,
  status: number,
  userData: any
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
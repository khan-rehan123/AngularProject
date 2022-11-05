import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';

import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ExportExcelService } from 'src/app/shared/export.service';


@Component({
  selector: 'app-stratigieslistfornonadmin',
  templateUrl: './stratigieslistfornonadmin.component.html',
  styleUrls: ['./stratigieslistfornonadmin.component.scss']
})
export class StratigieslistfornonadminComponent implements AfterViewInit {
  public showSearch: boolean = false;
  private dataArray: any;
  userDetail: any = '';
  biaList = [];
  public RoleID: number;
  statArray = [];
  remarks = '';
  public dataSource: MatTableDataSource<IProjectList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['ID', 'status_Name', 'strategy_Statement','strategyDescription', 'View', 'delete'];
  displayedColumnsPrint: string[] = ['status_Name','strategy_Statement', 'strategyDescription'];

  constructor(private formbuilder: FormBuilder, public snackBar: MatSnackBar,
    private exportCSV: ExportExcelService,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog
  ) { }
  ngAfterViewInit() {

  }
  selectedRowIndex = -1; 
  highlight(row) {
    debugger
    this.selectedRowIndex = row;
  }
  ngOnInit() {
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.RoleID = data.role_Id;
    this.getList();
  }

  async exportexcel() {
    this.httpService.getRequest('GET', 'GetStratigyList')
      .subscribe(
        res => {
          this.biaList = [];
          this.biaList = res;
          if (this.biaList.length > 0 || this.biaList.length == 0) {
            this.exportCSV.downloadFile(this.biaList, this.displayedColumnsPrint, 'Stratigy Approved List');
          }

          try {

          } catch (error) {

          }

        },
        error => {

        }
      );

  }
  getList() {
    this.httpService.getRequest('GET', 'GetStratigyList').subscribe(res => {
      debugger;
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IProjectList>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
    })
  }
  openDialogForView(user) {
    const dialogRefAdd = this.dialog.open(viewDialogClassForStatNA, {
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
export interface IProjectList {
  strategy_ID: number;
  strategy_Statement: string;
  strategyDescription: string;
  created_By: number;
  created_Date: Date
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ViewStratgy.component.html'
})
export class viewDialogClassForStatNA {
  viewData: any
  constructor(
    public dialogRef: MatDialogRef<viewDialogClassForStatNA>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

  }
  ngOnInit() {
    this.viewData = this.data.userData
    console.log(this.viewData);
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
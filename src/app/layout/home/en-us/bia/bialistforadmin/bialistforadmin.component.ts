
import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ExportExcelService } from 'src/app/shared/export.service';
import { viewDialogClass } from '../bia-list/bia-list.component';
/**
 * @title Table with pagination
 */
 @Component({
  selector: 'app-bialistforadmin',
  templateUrl: './bialistforadmin.component.html',
  styleUrls: ['./bialistforadmin.component.scss']
})
export class BialistforadminComponent implements AfterViewInit {
  displayedColumns: string[] = ['biA_ID','biA_NAME', 'bcM_Program_Name','bcM_Project_Name', 'bcM_Process_Name','Approve','View','delete'];
  displayedColumnsPrint: string[] = ['biA_ID','biA_NAME', 'bcM_Program_Name','bcM_Project_Name', 'bcM_Process_Name','status_Name'];

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;
  public showSearch:boolean = false;
  userDetail: any = '';
  public RoleID:number;
  statArray = [];
  remarks='';
   biaList=[];
  constructor(private formbuilder:FormBuilder ,private exportCSV: ExportExcelService,
    private router: Router ,public snackBar: MatSnackBar,private httpService: HttpRequestService,public dialog: MatDialog
    ) { }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    debugger;
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.RoleID=data.role_Id;
    this.getList();
    }
  getList(){
    this.httpService.getRequest('GET','BusinessImpactAnalysisListFORADMIN').subscribe(res=>{
 
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
          })
    }
      async exportexcel() {
        this.httpService.getRequest('GET','BusinessImpactAnalysisListFORADMIN')
          .subscribe(
            res => {
              this.biaList = [];
              this.biaList = res;
              if (this.biaList.length > 0 || this.biaList.length == 0) {
                this.exportCSV.downloadFile(this.biaList, this.displayedColumnsPrint, 'BIA Approved List');
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
    
    deleteBCMProgram(user:any): void {
      const dialogRefAdd = this.dialog.open(DeleteDialogComponent, {
        width: '480px',
        maxHeight : '500px',
        autoFocus: false,
        data: { userData: user ? user : '',
      }
      });
      this.router.events
   .subscribe(() => {
    dialogRefAdd.close();
   });
      dialogRefAdd.afterClosed().subscribe((result:any) => {
        console.log(result,'lllllllllllllllllllllllll');
        
        if (result) {
          this.getList();
        }
      });
    }
    getApproveReject(event,element){
      let filterData =  this.statArray.filter(ele=>ele.biA_ID ==element.biA_ID);
        if(filterData.length >0){
         let index =  this.statArray.findIndex(x => x.biA_ID ==element.biA_ID);
         this.statArray.splice(index,1);
        }
      if(event.value =='28'){
        let data = {
          biA_ID : element.biA_ID,
          biA_Status : Number(event.value)
        }
        this.statArray.push(data)
      } else {
        const dialogRef = this.dialog.open(remarkDialogClassForBia, {
          width: '500px',
          minHeight :'300px',
          data: {strategy_ID : element.biA_ID,
            status : Number(event.value)},
        });
    
        dialogRef.afterClosed().subscribe(result => {
console.log(result);

          let remark = {
            biA_ID : result.strategy_ID,
          biA_Status : result.status,
          returnComments :result.returnComments
          };
            this.statArray.push(remark)
        });
      }
    }
    ApproveReject(){
      console.log(this.statArray,'lllllllllllllllllll');
      this.httpService.getRequest('POST','BIAAPPROVEREJECT',this.statArray).subscribe(res=>{
        console.log(res);
        if(res){
          this.snackBar.open("Status Updated Successfully",'Sucess');
          this.getList();
          this.statArray =[]
        } else {
          this.snackBar.open('There is smothing spooky','Error')
        }
        
      })
    }
    openDialogForView(user){
      const dialogRefAdd = this.dialog.open(viewDialogClass, {
        width: '600px',
        minHeight : '200px',
        autoFocus: false,
        data: { userData: user ? user : '',
      }
      });
      this.router.events
   .subscribe(() => {
    dialogRefAdd.close();
   });
      dialogRefAdd.afterClosed().subscribe((result:any) => {
        console.log(result,'lllllllllllllllllllllllll');
        
        if (result) {
          // this.getList();
        }
      });
    }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'remarkdialog.component.html',
})
export class remarkDialogClassForBia {
  remark =''
  constructor(
    public dialogRef: MatDialogRef<remarkDialogClassForBia>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    let data ={
      strategy_ID : Number(this.data.strategy_ID),
      status : Number(this.data.status),
      returnComments : this.remark
    }
    this.dialogRef.close(data);
  }
}
export interface IProjectList {
  strategy_ID :number;
  strategy_Statement :string;
  strategyDescription :string;
  created_By :number;
    created_Date :Date
}

export interface DialogData {
  strategy_ID : number,
  status : number,
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
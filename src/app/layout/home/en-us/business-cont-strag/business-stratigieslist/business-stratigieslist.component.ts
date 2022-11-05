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
  selector: 'app-business-stratigieslist',
  templateUrl: './business-stratigieslist.component.html',
  styleUrls: ['./business-stratigieslist.component.scss']
})
export class BusinessStratigieslistComponent implements AfterViewInit {
  public showSearch:boolean = false;
  private dataArray: any;
  userDetail: any = '';
  public RoleID:number;
  statArray = [];
  remarks='';
  biaList=[];
  public dataSource: MatTableDataSource<IProjectList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['ID', 'status_Name','strategy_Statement', 'strategyDescription', 'Approve', 'Action'];
  displayedColumnsPrint: string[] =['status_Name', 'strategyDescription'];

  constructor(private formbuilder: FormBuilder, public snackBar: MatSnackBar,
    private exportCSV: ExportExcelService,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog
  ) { }
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.RoleID=data.role_Id;
    this.getList();
  }
  getList() { 
    this.httpService.getRequest('GET', 'GetStratigyListForApprove').subscribe(res => {
      debugger;
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IProjectList>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
    })
  }
  getApproveReject(event,element){
    let filterData =  this.statArray.filter(ele=>ele.strategy_ID ==element.strategy_ID);
      if(filterData.length >0){
       let index =  this.statArray.findIndex(x => x.strategy_ID ==element.strategy_ID);
       this.statArray.splice(index,1);
      }
    if(event.value =='28'){
      let data = {
        strategy_ID : element.strategy_ID,
        status : Number(event.value)
      }
      this.statArray.push(data)
    } else {
      const dialogRef = this.dialog.open(remarkDialogClass, {
        width: '500px',
        minHeight :'300px',
        data: {strategy_ID : element.strategy_ID,
          status : Number(event.value)},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        let remark = result;
          this.statArray.push(remark)
      });
    }
  }
    async exportexcel() {
        this.httpService.getRequest('GET','GetStratigyListForApprove')
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
  ApproveReject(){
 
    this.httpService.getRequest('POST','STATUSAPPROVE',this.statArray).subscribe(res=>{
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
    const dialogRefAdd = this.dialog.open(viewDialogClassForStat, {
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
export class remarkDialogClass {
  remark =''
  constructor(
    public dialogRef: MatDialogRef<remarkDialogClass>,
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
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ViewStratgy.component.html',
  styleUrls: ['./business-stratigieslist.component.scss']

})
export class viewDialogClassForStat {
viewData :any
  constructor(
    public dialogRef: MatDialogRef<viewDialogClassForStat>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    
  }
  ngOnInit(){
    this.viewData = this.data.userData
    console.log(this.viewData);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();

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
  userData:any
}
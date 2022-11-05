
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['org_ID','org_Name','website','contact_Email','contact_Phone','created_By', 'created_Date','Action','View','delete'];

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;

    public users=[];
    public searchText: string;
    public page:any;
    public showSearch:boolean = false;
    public viewType:string = 'grid';
    constructor(
                public dialog: MatDialog,
                private httpService: HttpRequestService,public snackBar: MatSnackBar){
    }

    ngOnInit() {
        this.getList();        
    }
    getList(){
   this.httpService.getRequest('GET','ORGLIST').subscribe((res:any)=>{
     console.log(res,'lllllllllllllllllllllllllllllllll');
     this.dataArray = res;
     this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
        },(err)=>{
          console.log(err);
          
        })
      }
    
    public openUserDialog(user){
        let dialogRef = this.dialog.open(UserDialogComponent, {
          width: '480px',
          maxHeight : '600px',
          autoFocus: false,
            data: user
        });
        dialogRef.afterClosed().subscribe(user => {
          this.getList();
        });
        this.showSearch = false;
    }
    deleteUser(user) {
      this.httpService.getRequest('GET','ORGDELETE',`id=${(Number(user.org_ID))}`).subscribe(res=>{
        if(res==1){
          this.snackBar.open('Organization Deleted Successfulyy', 'Success', {
            duration: 2000,
          });
        this.getList();

        }
      },err=>{
        this.snackBar.open('Something Spooky with our server', 'Error', {
          duration: 2000,
        });
      })
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


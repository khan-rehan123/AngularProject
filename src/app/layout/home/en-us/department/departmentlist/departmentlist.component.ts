
import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { DeleteDepDialogComponent } from '../delete-dialog/delete-dialog.component';
/**
 * @title Table with pagination
 */
 @Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.scss']
})
export class DepartmentlistComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'bcM_Program_ID','name','created_By', 'created_Date','Action','delete'];
  public showSearch:boolean = false;

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;

  constructor(private formbuilder:FormBuilder ,
    private router: Router ,private httpService: HttpRequestService,public dialog: MatDialog ) { }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getList();
    }
  getList(){
 this.httpService.getRequest('GET','GETDEPARTMENT').subscribe(res=>{
  this.dataArray = res;
  this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
      },(err)=>{
      })
    }
    ngOnDestroy() {
      
    }
    deleteBCMProgram(id:any){
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
      //     this.httpService.getRequest('GET','DELETEDEP',`id=${id}`).subscribe(res=>{
      //       if(res==1){
      //         this.toastr.success('Success!', 'Department has been deleted successfully');

      //       }
      //       this.getList();
      //     })
          
      //   }
      // })
    }
      // ******************open Dialog for add category **********************
      openUserDialog(user:any): void {
    const dialogRefAdd = this.dialog.open(DepartmentDialogComponent, {
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
      if (result) {
        this.getList();
      }
    });
  }
  // ******************open Dialog for add category  End**********************

  deleteDepartment(user:any): void {
    const dialogRefAdd = this.dialog.open(DeleteDepDialogComponent, {
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

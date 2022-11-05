
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
 
import {MatSort, Sort} from '@angular/material/sort';
@Component({
  selector: 'app-bcdrlist',
  templateUrl: './bcdrlist.component.html',
  styleUrls: ['./bcdrlist.component.scss']
})
 

export class BcdrlistComponent implements AfterViewInit {
  displayedColumns: string[] = ['planCategory_Id','plan_Name','last_Test_Date', 'focal_Point', 'scope', 'due_Date','approval_Date','Action','View','delete'];

  public dataSource: MatTableDataSource<IRandomUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  private dataArray: any;

  constructor(private formbuilder:FormBuilder ,
    private router: Router ,private httpService: HttpRequestService,
   ) { }
  ngAfterViewInit() {
 
  }

  ngOnInit(): void {
    this.getList();
    }
  getList(){
 this.httpService.getRequest('GET','ADDBCDRProgramList').subscribe(res=>{
 
  this.dataArray = res;
  this.dataSource = new MatTableDataSource<IRandomUsers>(this.dataArray);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
 
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
      //     this.httpService.getRequest('GET','DELETEBCDRPROGRAM',`id=${id}`).subscribe(res=>{
      //       if(res==1){
      //         this.toastr.success('Success!', 'BC-DR has been deleted successfully');

      //       }
      //       this.getList();
      //     })
          
      //   }
      // })
    }
}

export interface IRandomUsers {
  
  plan_Name: string;
   planCategory_Id: number;
  purpose: string;
  scope: string;
  department_Id: number;
  plan_Owner: number;
  focal_Point:number;
  status_Id: number;
  due_Date: string;
  review_Cycle_Id: number;
  last_Test_Date: string;
  next_Test_Date: string;
  reviewer_Id: number;
  review_Status_Id: number;
  approval_Date: number;
  created_By: number;
  created_Date:string;
}

 

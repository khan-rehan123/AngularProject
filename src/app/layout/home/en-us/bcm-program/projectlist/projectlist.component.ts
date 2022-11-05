import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})

export class ProjectlistComponent implements AfterViewInit {
  displayedColumns: string[] = ['ID', 'bcM_Program_ID', 'bcM_Project_Name', 'bcM_Project_Status', 'bcM_Project_Description', 'project_Owner', 'Project_Cordinator', 'region', 'created_Date', 'Action', 'View', 'delete'];

  public dataSource: MatTableDataSource<IProjectList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;
  public showSearch: boolean = false;

  constructor(private formbuilder: FormBuilder, public snackBar: MatSnackBar,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog
  ) { }
  ngAfterViewInit() {

  }
  deleteBCMProgram(user: any): void {
    const dialogRefAdd = this.dialog.open(DeleteDialogComponent, {
      width: '480px',
      maxHeight: '500px',
      autoFocus: false,
      data: {
        userData: user ? user : '',
        ApiType: 'DELETEPOJECT',
        title: 'BCM Project'
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
  getList() { 
    this.httpService.getRequest('GET', 'GETProjectList').subscribe(res => {
      debugger;
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IProjectList>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
    })
  }
  ngOnInit() {
    this.getList();
  }

}
export interface IProjectList {
  ID: number;
  bcM_Program_Description: string;
  bcM_Program_Name: string;
  bcM_Program_ID: number;
  bcM_Program_Scoping: number;
  bcM_Program_Status: number;

  created_By: number;

  created_Date: string;
}

import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IProjectList } from '../projectlist/projectlist.component';

@Component({
  selector: 'app-applicationlist',
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.scss']
})
export class ApplicationlistComponent implements OnInit {
  status = [{ Name: 'Draft', Value: '1' }, { Name: 'Open', Value: '2' }, { Name: 'In-Progress', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProcess: FormGroup;
  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = '';
  public showSearch: boolean = false;
  displayedColumns: string[] = ['ID', 'name', 'bcM_Program_Name', 'bcM_Project_Name', 'BCM_Process_Name', 'description', 'status', 'Modified_By', 'Action', 'View', 'delete'];

  public dataSource: MatTableDataSource<IProjectList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private dataArray: any;

  constructor(private formbuilder: FormBuilder, public snackBar: MatSnackBar,
    private router: Router, private httpService: HttpRequestService, public dialog: MatDialog) { }

  getList() { 
    this.httpService.getRequest('GET', 'LISTBCMAPPLICATION').subscribe(res => {
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
  deleteBCMProgram(user: any): void {
    const dialogRefAdd = this.dialog.open(DeleteDialogComponent, {
      width: '480px',
      maxHeight: '500px',
      autoFocus: false,
      data: {
        userData: user ? user : '',
        ApiType: 'DELETEBCMAPPLICATION',
        title: 'BCM Application'
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

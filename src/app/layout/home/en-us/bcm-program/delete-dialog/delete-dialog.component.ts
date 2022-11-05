import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  public departmentId = 0;
  isLoading = false;
  apiType: any;
  title: any;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user,
    public fb: FormBuilder,
    private httpService: HttpRequestService,
    public snackBar: MatSnackBar) {

  }
  async ngOnInit() {
    if (this.user) {
      this.departmentId = this.user.userData;
      this.apiType = this.user.ApiType;
      this.title =  this.user.title;
      console.log(this.apiType,this.title);
      
    } else {

    }
  }
  delete() {
    this.httpService.getRequest('GET', this.apiType, `id=${Number(this.departmentId)}`).subscribe(res => {
      if (res == 1) {
        this.dialogRef.close(res);
        this.snackBar.open(`${this.title} Deleted Successfully`, 'Success', {
          duration: 2000,
        })
      }
    }, (err) => {
      this.snackBar.open(err, 'Error', {
        duration: 2000,
      })
    })
  }
  deletebyID(id: number, msg: string, ApiName: string) {
    this.httpService.getRequest('GET', ApiName, `id=${Number(id)}`).subscribe(res => {
      if (res == 1) {
        this.dialogRef.close(res);
        this.snackBar.open(msg, 'Success', {
          duration: 2000,
        })
      }
    }, (err) => {
      this.snackBar.open(err, 'Error', {
        duration: 2000,
      })
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}

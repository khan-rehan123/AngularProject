import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class UserlistComponent implements OnInit {
  public users = [];
  public searchText: string;
  public page: any;
  public settings: Settings;
  public showSearch: boolean = false;
  public viewType: string = 'grid';
  constructor(public appSettings: AppSettings,
    public dialog: MatDialog,
    private httpService: HttpRequestService, public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.httpService.getRequest('GET', 'USERLIST').subscribe((res: any) => {
      debugger;
      this.users = res;
    }, (err) => {
      console.log(err);

    })
  }

  public changeView(viewType) {
    this.viewType = viewType;
    this.showSearch = false;
  }

  public onPageChanged(event) {
    this.page = event;
    // this.getUsers();    
    document.getElementById('main').scrollTop = 0;
  }

  public openUserDialog(user) {
    let dialogRef = this.dialog.open(UserDialogComponent, {
      width: '480px',
      maxHeight: '600px',
      autoFocus: false,
      data: user
    });
    dialogRef.afterClosed().subscribe(user => {
      this.getList();
    });
    this.showSearch = false;
  }
  deleteUser(user) {
    this.httpService.getRequest('GET', 'USERDELETE', `id=${(Number(user.user_ID))}`).subscribe(res => {
      if (res == 1) {
        this.snackBar.open('User Deleted Successfulyy', 'Success', {
          duration: 2000,
        });
        this.getList();

      }
    }, err => {
      this.snackBar.open('Something Spooky with our server', 'Error', {
        duration: 2000,
      });
    })
  }
}


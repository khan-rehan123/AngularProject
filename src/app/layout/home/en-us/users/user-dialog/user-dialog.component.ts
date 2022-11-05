import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { AddUserModel } from 'src/app/shared/Model/addUser';
import { UpdateUserModel } from 'src/app/shared/Model/UpdateUser';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  providers: [UpdateUserModel, AddUserModel]

})
export class UserDialogComponent implements OnInit {
  public addUserForm: FormGroup;
  public passwordHide: boolean = true;
  public userid = 0;
  createdDate: any;
  userDetail: any = '';
  localUserId: any;
  isLoading = false;
  RoleArray: any;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user,
    public fb: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private route: ActivatedRoute,
    private addModel: AddUserModel, private updateModel: UpdateUserModel, public snackBar: MatSnackBar) {

  }
  async ngOnInit() {


    await this.createOrganizationForm();
    await this.RoleList();
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.localUserId = data.id;

    if (this.user) {
      this.bindViewData();
      this.userid = this.user.user_ID;
    } else {

    }
  }

  bindViewData() {
    this.addUserForm.patchValue({
      firstName: this.user.user_First_Name,
      lastName: this.user.user_Last_Name,
      email: this.user.user_Email_Address,
      phone: this.user.user_Primary_Phone,
      active: this.user.active,
      password: this.user.password
    })
    this.createdDate = this.user.created_Date;

  }

  RoleList() {
    debugger;
    this.httpService.getRequest('GET', 'RoleList').subscribe(res => {
      this.RoleArray = res;
    }, (err) => {
    })
  }


  createOrganizationForm() {
    this.addUserForm = this.fb.group({
      id: null,
      Role: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      active: [true, Validators.required],
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  addUpdate() {
    if (this.userid > 0) {
      this.UpdateOrganization();
    } else {
      this.AddOrganization();
    }
  }

  UpdateOrganization() {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      this.updateModel = {
        user_ID: Number(this.userid),
        user_First_Name: this.addUserForm.value.firstName,
        user_Last_Name: this.addUserForm.value.lastName,
        user_Email_Address: this.addUserForm.value.email,
        user_Primary_Phone: this.addUserForm.value.phone,
        password: this.addUserForm.value.password,
        role_ID: Number(this.addUserForm.value.Role),
        active: this.addUserForm.value.active,
        created_By: Number(this.localUserId),
        created_Date: new Date(this.createdDate),
        modified_By: Number(this.localUserId),
        modified_Date: new Date(),
        org_Id: 1
      }
      this.httpService.getRequest('POST', 'USERUPDATE', this.updateModel).subscribe(res => {
        if (res) {
          this.addUserForm.reset();
          this.isLoading = false
          this.snackBar.open('User Updated Successfulyy', 'Success', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      })
      // this.httpService.getRequest('GET','GETUSERLIST').subscribe(res=>{
      // })
    } else {
      this.snackBar.open('Something Spooky with Our Server', 'Error', {
        duration: 2000,
      });
    }


  }
  AddOrganization() {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      this.addModel = {
        user_ID: 0,
        user_First_Name: this.addUserForm.value.firstName,
        user_Last_Name: this.addUserForm.value.lastName,
        user_Email_Address: this.addUserForm.value.email,
        user_Primary_Phone: this.addUserForm.value.phone,
        password: this.addUserForm.value.password,
        role_ID:Number(this.addUserForm.value.Role) ,
        active: this.addUserForm.value.active,
        created_By: Number(this.localUserId),
        created_Date: new Date(),
        modified_By: Number(this.localUserId),
        modified_Date: new Date(),
        org_Id: 1
      }
      this.httpService.getRequest('POST', 'USERADD', this.addModel).subscribe(res => {
        if (res) {
          this.addUserForm.reset();
          this.isLoading = false;
          this.dialogRef.close();
          this.snackBar.open('User Created Successfulyy', 'Success', {
            duration: 2000,
          });
        }

      })
    } else {
      this.snackBar.open('Something Spooky with Our Server', 'Error', {
        duration: 2000,
      });
    }


  }

}

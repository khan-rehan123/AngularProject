import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss'],
})
export class DepartmentDialogComponent implements OnInit {
  public addUserForm:FormGroup;
  public passwordHide:boolean = true;
  public departmentId=0;
  createdDate: any;
  userDetail:any='';
  localUserId: any;
  isLoading = false;
  buttonTitle: string;
  constructor(public dialogRef: MatDialogRef<DepartmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user,
              public fb: FormBuilder,
              private httpService: HttpRequestService,
              public snackBar: MatSnackBar) {
 
  }
  async ngOnInit() {
    console.log(this.user,'userrrrrrrrrrrrrrrrrrrrrrr');
    
    await this.createOrganizationForm();
  
   this.userDetail = (localStorage.getItem('userDetail'))
   let data = JSON.parse(this.userDetail)
   this.localUserId = data.id;

   if(this.user){
    this.bindViewData();
    this.departmentId =  this.user.userData.id;
    this.buttonTitle = 'Update'
   } else {
this.buttonTitle = 'Save'
   }
     }

     bindViewData(){
      this.addUserForm.patchValue({
        departmentName: this.user.userData.name,
      })
      this.createdDate = this.user.userData.created_Date;
      // this.httpService.getRequest('GET_ID','USERVIEW',this.userId).subscribe(res=>{
      //   this.createdDate = res.created_Date;
       
      // })
    }
     createOrganizationForm(){
      this.addUserForm = this.fb.group({
        departmentName :[null,Validators.required],
      });
     }
  close(): void {
    this.dialogRef.close();
  }

  addUpdate(){
    if(this.departmentId >0){
      this.updateDep()
    } else {
      this.addDepartment()
    }
  } 
  updateDep(){
    this.isLoading = true;
    if(this.addUserForm.valid){
      let catModel ={
        id: this.departmentId,
        name : this.addUserForm.value.departmentName,
        created_By: 5,
         created_Date: this.user.userData.created_Date,
        modified_By: 0,
        modified_Date: new Date()
      }
      this.httpService.getRequest('POST','UPDATEDEP',catModel).subscribe(res =>{
        if(res){
          this.isLoading = false;
          this.addUserForm.reset();
          this.dialogRef.close(res);
          this.snackBar.open('Department Updated Succesfully','Success', {
            duration: 2000,
          })
          
        }
       
      },(err)=>{
        this.snackBar.open(err,'Error', {
          duration: 2000,
        })
      })
    
    }else {
      this.isLoading = false
    }
    
  }
  addDepartment(){
    if(this.addUserForm.valid){
      let catModel ={
        name : this.addUserForm.value.departmentName,
        created_By: 0,
        created_Date: new Date(),
        modified_By: 0,
        modified_Date: new Date()
      }
      this.httpService.getRequest('POST','ADDDEP',catModel).subscribe(res =>{
        if(res){
          this.addUserForm.reset();
          this.dialogRef.close(res);
          this.snackBar.open('Department Saved Succesfully','Success', {
            duration: 2000,
          })
        }
       
      },(err)=>{
        this.snackBar.open(err,'Error', {
          duration: 2000,
        })
      })
    } else {
      this.isLoading = false;
    }
    
  }
}

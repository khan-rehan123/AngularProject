import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { AddOrgModel } from 'src/app/shared/Model/addorg';
import { UpdateOrgModel } from 'src/app/shared/Model/updateorg';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  providers: [UpdateOrgModel,AddOrgModel]

})
export class UserDialogComponent implements OnInit {
  public addOrgForm:FormGroup;
  public passwordHide:boolean = true;
  public userid=0;
  createdDate: any;
  userDetail:any='';
  localUserId: any;
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user,
              public fb: FormBuilder,
              private router: Router ,private httpService: HttpRequestService,
              private route: ActivatedRoute, 
              private addModel :AddOrgModel,private updateModel :UpdateOrgModel,public snackBar: MatSnackBar) {
 
  }
  async ngOnInit() {
    console.log(this.user,'userrrrrrrrrrrrrrrrrrrrrrr');
    
    await this.createOrganizationForm();
  
   this.userDetail = (localStorage.getItem('userDetail'))
   let data = JSON.parse(this.userDetail)
   this.localUserId = data.id;

   if(this.user){
    this.bindViewData();
    this.userid =  this.user.org_ID;
   } else {

   }
     }

     bindViewData(){
      this.addOrgForm.patchValue({
        orgName: this.user.org_Name,
        website: this.user.website,
        email: this.user.contact_Email,
        phone: this.user.contact_Phone,
      })
      this.createdDate = this.user.created_Date;
      // this.httpService.getRequest('GET_ID','USERVIEW',this.userId).subscribe(res=>{
      //   this.createdDate = res.created_Date;
       
      // })
    }
     createOrganizationForm(){
      this.addOrgForm = this.fb.group({
        orgName :[null,Validators.required],
        website :[null,Validators.required],
        phone :[null,Validators.required],
        email: [null, Validators.compose([Validators.required])],
      });
     }
  close(): void {
    this.dialogRef.close();
  }
  addUpdate(){
    if(this.userid > 0){
      this.UpdateOrganization();
    } else{
      this.AddOrganization();
    }
  }
  
  UpdateOrganization(){
    if(this.addOrgForm.valid){
      this.isLoading = true;
      this.updateModel ={
        org_ID : Number(this.userid),
        org_Name : this.addOrgForm.value.orgName,
        website : this.addOrgForm.value.website,
        contact_Email : this.addOrgForm.value.email,
        contact_Phone : this.addOrgForm.value.phone,
        created_By : Number(this.localUserId),
        created_Date:this.createdDate,
        modified_By : Number(this.localUserId),
        modified_Date :new Date(),
      }
      this.httpService.getRequest('POST','ORGUPDATE',this.updateModel).subscribe(res=>{
        if(res) {
          this.addOrgForm.reset();
          this.isLoading = false
          this.snackBar.open('Organisation Updated Successfulyy', 'Success', {
            duration: 2000,
          });
          this.dialogRef.close();        }
      })
      // this.httpService.getRequest('GET','GETUSERLIST').subscribe(res=>{
      // })
    } else {
      this.snackBar.open('Something Spooky with Our Server', 'Error', {
        duration: 2000,
      });
    }

    
  }
  AddOrganization(){
    if(this.addOrgForm.valid){
      this.isLoading = true;
   this.addModel ={
    org_Name : this.addOrgForm.value.orgName,
    website : this.addOrgForm.value.website,
    contact_Email : this.addOrgForm.value.email,
    contact_Phone : this.addOrgForm.value.phone,
    created_By : Number(this.localUserId),
    created_Date:new Date(),
    modified_By : Number(this.localUserId),
    modified_Date :new Date(),
   }
      this.httpService.getRequest('POST','ORGADD',this.addModel).subscribe(res=>{
        if(res) {
          this.addOrgForm.reset();
          this.isLoading = false;
          this.dialogRef.close();
          this.snackBar.open('Organization Created Successfulyy', 'Success', {
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

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { bcmprogramModel } from 'src/app/shared/Model/BCMProgram';
import { bcmprogramModelUpdate } from 'src/app/shared/Model/BCMProgramUpdate';

import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-bcm-addupdate',
  templateUrl: './bcm-addupdate.component.html',
  styleUrls: ['./bcm-addupdate.component.scss'],
  providers: [bcmprogramModelUpdate, bcmprogramModel]

})
export class BcmAddupdateComponent implements OnInit {
  //status = [{ Name: 'Draft', Value: '1' }, { Name: 'Open', Value: '2' }, { Name: 'In-Progress', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProgram: FormGroup;
  public addBCMProject: FormGroup;
  public addBCMProcess: FormGroup;
  public status = [];
  public users = [];
  myControl = new FormControl('');
 
  filteredOptions: Observable<string[]>;
  userDetail: any = '';
  localUserId: any;
  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = ''
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  buttonTitle: string;
  constructor(private formbuilder: FormBuilder, private formbuilder1: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private bcmModalUpdate: bcmprogramModelUpdate, private bcmModel: bcmprogramModel, private route: ActivatedRoute, public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    debugger;
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.localUserId = data.id;
    await this.createBCMForm();
    await this.createBCMProject(); 
    await this.getStatusList();
    await this.getListUserList(); 
    await this.route.params.subscribe(params => {
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
        this.bindViewData();
        this.title = 'Update BCM Program'
        this.icon = 'edit'
        this.buttonTitle = 'Update '
      } else {
        this.title = 'Add BCM Program'
        this.icon = 'add'
        this.buttonTitle = 'Send For Approval '
      }
    });
  }
  private _filter(value: string): string[] { 
    const filterValue = value.toLowerCase(); 
    return this.users.filter(option => option.toLowerCase().includes(filterValue));
  }
  getStatusList() {
    this.httpService.getRequest('GET', 'StatusList').subscribe((res: any) => {
      debugger;
      this.status = res;
      
    }, (err) => {
     

    })
  }
  getListUserList() {
    this.httpService.getRequest('GET', 'USERLIST').subscribe((res: any) => {

      this.users = res;
    }, (err) => {
      

    })
  }
  bindViewData() {
    this.httpService.getRequest('GET_ID', 'VIEWBCMPROGRSM', this.bcmprogramId).subscribe(res => {
      
      this.addBCMProgram.patchValue({ 
        BCMStatus: res.bcM_Program_Status ? res.bcM_Program_Status : 0,
        BCMProgramName: res.bcM_Program_Name ? res.bcM_Program_Name : '',
        BCMProgramDesc: res.bcM_Program_Description ? res.bcM_Program_Description : '', 
        BCMProgramOwner: res.bcM_Program_Owner ? res.bcM_Program_Owner : 0,  
        BCMProgramManager: res.bcM_Program_Manager ? res.bcM_Program_Manager : 0,  
        BCMLocation: res.bcM_Program_Region ? res.bcM_Program_Region : '',
        StartDate: res.bcM_Program_StartDate ? new Date(res.bcM_Program_StartDate) : '',
        CompletionDate: res.bcM_Actual_CompletionDate ? new Date(res.bcM_Actual_CompletionDate) : '',
        ResponsePeriodDays: res.bcM_Response_Period ? res.bcM_Response_Period : 0,
        ResponsePeriodDueDays: res.bcM_Response_Period_Due ? new Date(res.bcM_Response_Period_Due) : '',
        ReviewPeriodDays: res.review_Period_Days ? res.review_Period_Days : '',
        ReviewPeriodDuesDays: res.bcM_Next_Review_Due_Date ? new Date(res.bcM_Next_Review_Due_Date) : '',
       LastReviewDate: res.last_Review_Date ? new Date(res.last_Review_Date) : '', 
       NextReviewDueDate:res.bcM_Next_Review_Due_Date ? new Date(res.bcM_Next_Review_Due_Date) : '', 
      })
    })
  }
  createDateAsUTC(date: any) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  convertDateToUTC(date: any) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
  createBCMForm() {
    this.addBCMProgram = this.formbuilder.group({
      BCMStatus: new FormControl(null, [Validators.required]),
      BCMProgramName: new FormControl(null, [Validators.required]),
      BCMProgramDesc: new FormControl(null, [Validators.required]),
      BCMProgramManager: new FormControl(null, [Validators.required]),
      BCMProgramOwner: new FormControl(null, [Validators.required]),
      BCMLocation: new FormControl(null, [Validators.required]),
      StartDate: new FormControl(null, [Validators.required]),
      CompletionDate: new FormControl(null, [Validators.required]),
      LastReviewDate: new FormControl(null, [Validators.required]),
      NextReviewDueDate: new FormControl(null, [Validators.required]),
      ReviewPeriodDays: new FormControl(null, [Validators.required]),
      ReviewPeriodDuesDays: new FormControl(null, [Validators.required]),
    });
  }  // get getControls() { return this.addBCMProgram.controls; }
  get getControls(): { [key: string]: AbstractControl } {
    return this.addBCMProgram.controls;
  }
  get getControlsP(): { [key: string]: AbstractControl } {
    return this.addBCMProject.controls;
  }
  createBCMProject() {
    this.addBCMProject = this.formbuilder.group({
      BCMProjectStatus: new FormControl(null, [Validators.required]),
      BCMProjectName: new FormControl(null, [Validators.required]),
      BCMProjectDesc: new FormControl(null, [Validators.required]),
      BCMProgramCordinator: new FormControl(null, [Validators.required]),
      BCMProjectOwner: new FormControl(null, [Validators.required]),
      BCMProjectLocation: new FormControl(null, [Validators.required]),
    });
  }
 
  
  addUpdate() {
    if (this.bcmprogramId > 0) {
      this.UpdateProgramBCM();
    } else {
      this.BCMProgramAdd();
    }
  }

  UpdateProgramBCM() {
    this.submitted = true;
    if (this.addBCMProgram.valid) {
      this.bcmModalUpdate = {
        bcM_Program_ID: Number(this.bcmprogramId),
        bcM_Program_Status: Number(this.addBCMProgram.value.BCMStatus),
        bcM_Program_Name: this.addBCMProgram.value.BCMProgramName,
        bcM_Program_Description: this.addBCMProgram.value.BCMProgramDesc,
        bcM_Program_Owner: Number(this.addBCMProgram.value.BCMProgramOwner),
        bcM_Program_Manager: Number(this.addBCMProgram.value.BCMProgramManager),
        bcM_Program_StartDate: new Date(this.addBCMProgram.value.StartDate),
        bcM_Actual_CompletionDate: new Date(this.addBCMProgram.value.CompletionDate),
        review_Period_Days: Number(this.addBCMProgram.value.ReviewPeriodDays), 
        last_Review_Date: new Date(this.addBCMProgram.value.LastReviewDate),
        bcM_Next_Review_Due_Date: new Date(this.addBCMProgram.value.NextReviewDueDate),
        bcM_Program_Region: this.addBCMProgram.value.BCMLocation,
        created_By: Number(this.localUserId),
        created_Date: new Date(),
      }


      this.httpService.getRequest('POST', 'UPDATEBCMPROGRAM', this.bcmModalUpdate).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProgram.reset();
          this.router.navigate(['/en-us/bcmprogram/programlist'])
          this.snackBar.open('BCM Program Updated Succesfully', 'Success', {
            duration: 2000,
          })
        }
      }, err => {
        this.snackBar.open(err, 'Error', {
          duration: 2000,
        })
      })
    } else {
      this.submitted = false
      this.snackBar.open('Please Fill all field', 'Error', {
        duration: 2000,
      })
    }


  }
  BCMProgramAdd() {
    this.submitted = true;
    let abc = new Date(this.addBCMProgram.value.StartDate)
    if (this.addBCMProgram.valid) {
      this.bcmModel = {
        bcM_Program_Status: Number(this.addBCMProgram.value.BCMStatus),
        bcM_Program_Name: this.addBCMProgram.value.BCMProgramName,
        bcM_Program_Description: this.addBCMProgram.value.BCMProgramDesc,
        bcM_Program_Owner: Number(this.addBCMProgram.value.BCMProgramOwner),
        bcM_Program_Manager: Number(this.addBCMProgram.value.BCMProgramManager),
        bcM_Program_StartDate: new Date(this.addBCMProgram.value.StartDate),
        bcM_Actual_CompletionDate: new Date(this.addBCMProgram.value.CompletionDate),
        review_Period_Days: Number(this.addBCMProgram.value.ReviewPeriodDays),

        last_Review_Date: new Date(this.addBCMProgram.value.LastReviewDate),
        bcM_Next_Review_Due_Date: new Date(this.addBCMProgram.value.NextReviewDueDate),
        bcM_Program_Region: this.addBCMProgram.value.BCMLocation,
        created_By: Number(this.localUserId),
        created_Date: new Date(),
      }



      this.httpService.getRequest('POST', 'ADDBCMPROGRAM', this.bcmModel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProgram.reset();
          this.router.navigate(['/en-us/bcmprogram/programlist'])
          this.snackBar.open('BCM Program Updated Succesfully', 'Success', {
            duration: 2000,
          })
        }
      })
    } else {
      this.submitted = false
    }


  }


}


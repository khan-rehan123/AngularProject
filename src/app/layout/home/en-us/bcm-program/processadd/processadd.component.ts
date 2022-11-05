import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';

@Component({
  selector: 'app-processadd',
  templateUrl: './processadd.component.html',
  styleUrls: ['./processadd.component.scss'],
  providers: []

})
export class ProcessaddComponent implements OnInit {
  //status = [{ Name: 'Draft', Value: '1' }, { Name: 'Open', Value: '2' }, { Name: 'In-Progress', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProcess: FormGroup;
  public status = [];
  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = '';
  userDetail: any = '';
  localUserId: any;
  isLoading = false;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  buttonTitle: string;
  bcmProgramList: any;
  projectList: any;
  constructor(private formbuilder: FormBuilder, private formbuilder1: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private route: ActivatedRoute, public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.createBCMProcessForm();
    await this.BindBCMprogram();
    this.getStatusList();
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.localUserId = data.id;
    await this.route.params.subscribe(params => {
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
        this.bindViewData();
        this.title = 'Update Process'
        this.icon = 'edit'
        this.buttonTitle = 'Update'
      } else {
        this.title = 'Add Process'
        this.icon = 'add'
        this.buttonTitle = 'Add'
      }
    });
  }
  createDateAsUTC(date: any) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }
  getStatusList() {
    this.httpService.getRequest('GET', 'StatusList').subscribe((res: any) => {
      this.status = res;
    }, (err) => {


    })
  }
  convertDateToUTC(date: any) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
  bindViewData() {
    this.httpService.getRequest('GET_ID', 'VIEWBCMPROCESS', this.bcmprogramId).subscribe(res => {

      this.addBCMProcess.patchValue({
        BCMProcessStatus: res.bcM_Process_Status ? String(res.bcM_Process_Status) : '',
        BCMProcessName: res.bcM_Process_Name,
        BCMProcessDesc: res.bcM_Process_Description,
        BCMProcessLocation: res.region,
        BCMProgram: res.bcM_Program_ID
      })
    })
  }

  addUpdateProject() {

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
    if (this.addBCMProcess.valid) {
      let bcmProcessModel = {
        id: Number(this.bcmprogramId),
        bcM_Program_ID: Number(this.addBCMProcess.value.BCMProgram),
        bcM_Process_Name: (this.addBCMProcess.value.BCMProcessName),
        bcM_Process_Status: Number(this.addBCMProcess.value.BCMProcessStatus),
        bcM_Process_Description: this.addBCMProcess.value.BCMProcessDesc,
        region: this.addBCMProcess.value.BCMProcessLocation,
        bcM_Program_Owner: 1,
        created_By: Number(this.localUserId),
        modified_By: 12,
        created_Date: new Date(),
        modified_Date: new Date(),
      }
      this.httpService.getRequest('POST', 'UPDATEBCMPROCESS', bcmProcessModel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProcess.reset();
          this.router.navigate(['/en-us/bcmprogram/processlist'])
          this.snackBar.open('BCM Process Updated Succesfully', 'Success', {
            duration: 2000,
          })
        }
      })
    } else {
      this.submitted = false
    }


  } 1

  createBCMProcessForm() {
    this.addBCMProcess = this.formbuilder.group({
      BCMProcessStatus: new FormControl(null, [Validators.required]),
      BCMProcessName: new FormControl(null, [Validators.required]),
      BCMProcessDesc: new FormControl(null, [Validators.required]),
      BCMProcessLocation: new FormControl(null, [Validators.required]),
      BCMProgram: new FormControl(null, [Validators.required]),
      BCMProject: new FormControl(null, [Validators.required]),

    });
  }
  BCMProgramAdd() {
    this.submitted = true;
    if (this.addBCMProcess.valid) {
      let bcmProcessModel = {
        id: 0,
        bcM_Program_ID: Number(this.addBCMProcess.value.BCMProgram),
        bcM_Process_Name: (this.addBCMProcess.value.BCMProcessName),
        bcM_Process_Status: Number(this.addBCMProcess.value.BCMProcessStatus),
        bcM_Process_Description: this.addBCMProcess.value.BCMProcessDesc,
        region: this.addBCMProcess.value.BCMProcessLocation,
        BCM_ProjectId: Number(this.addBCMProcess.value.BCMProject),
        bcM_Program_Owner: 1,
        created_By: Number(this.localUserId),
        modified_By: Number(this.localUserId),
        created_Date: new Date(),
        modified_Date: new Date(),
      }



      this.httpService.getRequest('POST', 'ADDBCMPROCESS', bcmProcessModel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProcess.reset();
          this.router.navigate(['/en-us/bcmprogram/processlist'])
          this.snackBar.open('BCM Process Added Succesfully', 'Success', {
            duration: 2000,
          })
        }
      })
    } else {
      this.submitted = false
    }


  }
  BindBCMprogram() {
    this.httpService.getRequest('GET', 'GETBCMPROGRAMLIST').subscribe(res => {
      this.bcmProgramList = res;
    }, (err) => {
    })
  }
  BindBCMProject(event) {
    this.httpService.getRequest('GET', 'LISTBCMPROJECTBYID', `programId=${event.value}`).subscribe(res => {

      this.projectList = res;

    }, (err) => {
    })
  }
}


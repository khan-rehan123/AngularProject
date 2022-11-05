import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { bcmProjectModel } from 'src/app/shared/Model/BCMProgram';
import { bcmprogramModelUpdate } from 'src/app/shared/Model/BCMProgramUpdate';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [bcmprogramModelUpdate, bcmProjectModel]

})
export class ProjectComponent implements OnInit {
  //status = [{ Name: 'ON Hold', Value: '1' }, { Name: 'Complet', Value: '2' }, { Name: 'Medium', Value: '3' }, { Name: 'Low', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProject: FormGroup;
  public dataArray: any;
  public users = [];
  public status = [];
  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  userDetail: any = '';
  localUserId: any;
  isLoading = false;

  title = '';
  icon = ''
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  buttonTitle: string;
  constructor(private formbuilder: FormBuilder, private formbuilder1: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private bcmModalUpdate: bcmprogramModelUpdate, private bcmModel: bcmProjectModel, private route: ActivatedRoute, public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.createBCMProject();
    await this.BindBCMprogram();
    await this.getListUserList();
    await this.getStatusList();

    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.localUserId = data.id;
    await this.route.params.subscribe(params => {
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
        // this.bindViewData();
        this.title = 'Update Project'
        this.icon = 'edit'
        this.buttonTitle = 'Update '
      } else {
        this.title = 'Add Project'
        this.icon = 'add'
        this.buttonTitle = 'Add '
      }
    });
    await this.bindViewData();
  }


  createDateAsUTC(date: any) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }
  getStatusList() {
    this.httpService.getRequest('GET', 'StatusList').subscribe((res: any) => {
      debugger;
      this.status = res;

    }, (err) => {
      console.log(err);

    })
  }
  convertDateToUTC(date: any) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
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
      bcmProgramm: new FormControl(null, [Validators.required]),
    });
  }

  bindViewData() {
    debugger;
    this.httpService.getRequest('GET_ID', 'VIEWBCMProjectByID', this.bcmprogramId).subscribe(res => {
      this.addBCMProject.patchValue({
        BCMProjectStatus: res.bcM_Project_Status,
        BCMProjectName: res.bcM_Project_Name,
        BCMProjectDesc: res.bcM_Project_Description,
        BCMProjectLocation: res.region,
        bcmProgramm: res.bcM_Program_ID,
        BCMProgramCordinator: res.project_Cordinator,
        BCMProjectOwner: res.project_Owner,

      })
      console.log("project " + res);
    })
  }

  addUpdate() {
    debugger;
    if (this.bcmprogramId > 0) {
      this.UpdateProgramBCM();
    } else {
      this.BCMProgramAdd();
    }
  }
  getListUserList() {
    this.httpService.getRequest('GET', 'USERLIST').subscribe((res: any) => {
      debugger;
      this.users = res;
    }, (err) => {
      console.log(err);

    })
  }
  UpdateProgramBCM() {
    this.submitted = true;
    if (this.addBCMProject.valid) {
      this.bcmModel = {
        ID: Number(this.bcmprogramId),
        BCM_Program_ID: Number(this.addBCMProject.value.bcmProgramm),
        BCM_Project_Name: this.addBCMProject.value.BCMProjectName,
        BCM_Project_Status: Number(this.addBCMProject.value.BCMProjectStatus),
        BCM_Project_Description: this.addBCMProject.value.BCMProjectDesc,
        Project_Owner: this.addBCMProject.value.BCMProjectOwner,
        Project_Cordinator: Number(this.addBCMProject.value.BCMProgramCordinator),//this.addBCMProject.value.BCMProgramCordinator, 
        Region: this.addBCMProject.value.BCMProjectLocation,
        Created_By: Number(this.localUserId),
        created_Date: new Date(),
      }
      this.httpService.getRequest('POST', 'UPDATEBCMProject', this.bcmModel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProject.reset();
          this.router.navigate(['/en-us/bcmprogram/projectlist'])
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
    let abc = new Date(this.addBCMProject.value.StartDate)
    if (this.addBCMProject.valid) {
      this.bcmModel = {
        ID: 0,
        BCM_Program_ID: Number(this.addBCMProject.value.bcmProgramm),
        BCM_Project_Name: this.addBCMProject.value.BCMProjectName,
        BCM_Project_Status: Number(this.addBCMProject.value.BCMProjectStatus),
        BCM_Project_Description: this.addBCMProject.value.BCMProjectDesc,
        Project_Owner: this.addBCMProject.value.BCMProjectOwner,
        Project_Cordinator: Number(this.addBCMProject.value.BCMProgramCordinator),//this.addBCMProject.value.BCMProgramCordinator, 
        Region: this.addBCMProject.value.BCMProjectLocation,
        Created_By: Number(this.localUserId),
        created_Date: new Date(),
      }
      this.httpService.getRequest('POST', 'AddProject', this.bcmModel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProject.reset();
          this.router.navigate(['/en-us/bcmprogram/projectlist'])
          this.snackBar.open('BCM Program Added Succesfully', 'Success', {
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
      this.dataArray = res;

    }, (err) => {
    })
  }

}



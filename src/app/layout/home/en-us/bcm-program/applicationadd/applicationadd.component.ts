import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';

@Component({
  selector: 'app-applicationadd',
  templateUrl: './applicationadd.component.html',
  styleUrls: ['./applicationadd.component.scss']
})
export class ApplicationaddComponent implements OnInit {
  status = [{ Name: 'Draft', Value: '1' }, { Name: 'Open', Value: '2' }, { Name: 'In-Progress', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProcess: FormGroup;
  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = '';
  userDetail: any = '';
  localUserId: any;
  public dataArray: any;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  buttonTitle: string;
  bcmProgramList: any;
  projectList: any;
  processList: any;
  userID =0;
  createdBy :any;
  createdDate: any;
  constructor(private formbuilder: FormBuilder, private formbuilder1: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.title = 'Add Application';
    this.icon = 'add'
    this.buttonTitle = 'Add'
    this.createBCMProcessForm();
    this.BindBCMprogram();
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.localUserId = data.id;
    await this.route.params.subscribe(params => {
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
         this.bindViewData();
        this.title = 'Update BCM Application'
        this.icon = 'edit'
        this.buttonTitle = 'Update '
      } else {
        this.title = 'Add BCM Application'
        this.icon = 'add'
        this.buttonTitle = 'Add '
      }
    });

    let userData = JSON.parse(localStorage.getItem('userDetail'));
    this.userID = Number(userData.id); 
    
  }
  bindViewData(){
    this.httpService.getRequest('GET_ID','VIEWBCMAPPLICATION',this.bcmprogramId).subscribe(res=>{
    
      this.createdBy = res.created_By;
      this.createdDate =res.created_Date
      this.addBCMProcess.patchValue({
        BCMProcessName: res.name,
        BCMProcessDesc: res.description,
        BCMProcessLocation: res.region,
        BCMProgram: res.bcM_ProgramId,
        BCMProcess: res.bcM_ProcessId, 
        BCMProject: res.bcM_ProjectId,
      })
      
    })
  }
  createBCMProcessForm() {
    this.addBCMProcess = this.formbuilder.group({
      BCMProcessName: new FormControl(null, [Validators.required]),
      BCMProcessDesc: new FormControl(null, [Validators.required]),
      BCMProcessLocation: new FormControl(null, [Validators.required]),
      BCMProgram: new FormControl(null, [Validators.required]),
      BCMProcess: new FormControl(null),

      BCMProject: new FormControl(null, [Validators.required]),
    });
  }
  BindBCMProject(event) {
   
    let  data = {
        programId : event.value
      }
    this.httpService.getRequest('GET', 'LISTBCMPROJECTBYID',`programId=${event.value}`).subscribe(res => {

      this.projectList = res;
      console.log(this.projectList)

    }, (err) => {
    })
  }
  BindBCMProcess(event){
    this.httpService.getRequest('GET', 'LISTBCMPROCESSBYID',`projectId=${event.value}`).subscribe(res => {

      this.processList = res; 

    }, (err) => {
    })
  }
  BindBCMprogram() {
    this.httpService.getRequest('GET', 'GETBCMPROGRAMLIST').subscribe(res => {

      this.dataArray = res; 

    }, (err) => {
    })
  }
  addupdate() {
    if (this.bcmprogramId > 0) {
      this.UpdateApplication();
    } else {
      this.BCMAPplicationAdd();
    }
  }
  BCMAPplicationAdd() {
   
    if (this.addBCMProcess.valid) {
      let addModel = {
        id: 0,
        bcM_ProcessId:Number( this.addBCMProcess.value.BCMProcess),
        name: this.addBCMProcess.value.BCMProcessName,
        description :this.addBCMProcess.value.BCMProcessDesc,
        created_By : Number(this.userID),
        created_Date : new Date(),
        modified_By :this.userID,
        modified_Date : new Date()
      }
      this.httpService.getRequest('POST','ADDBCMAPPLICATION',addModel).subscribe(res=>{
        if(res){
          this.snackBar.open('Application Added Successfully','Success');
          this.router.navigate(['/en-us/bcmprogram/applicationlist'])
        }
      },err=>{
        this.snackBar.open(err,'ERROR')
      })
    }
  }
  UpdateApplication() {
    // if (this.addBCMProcess.valid) {
      let addModel = {
        id: this.bcmprogramId >0 ?Number(this.bcmprogramId) : 0,
        bcM_ProcessId: this.addBCMProcess.value.BCMProcess?this.addBCMProcess.value.BCMProcess:1,
        name: this.addBCMProcess.value.BCMProcessName,
        description :this.addBCMProcess.value.BCMProcessDesc,
        created_By : Number(this.createdBy),
        created_Date : this.createdDate,
        modified_By :this.userID,
        modified_Date : new Date()
      }
      this.httpService.getRequest('POST','UPDATEBCMAPPLICATION',addModel).subscribe(res=>{
        if(res){
          this.snackBar.open('Application Updated Successfully','Success');
          this.router.navigate(['/en-us/bcmprogram/applicationlist'])

        }
      },err=>{
        this.snackBar.open(err,'ERROR')
      })
    }
  // }
}




import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { AddIncidentModel } from 'src/app/shared/Model/addincident';
import { UpdateIncidentModel } from 'src/app/shared/Model/updateincident';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.scss'],
  providers: [AddIncidentModel,UpdateIncidentModel]

})
export class AddupdateComponent implements OnInit {
  status = [{Name :'Draft',Value:'1'},{Name :'Open',Value:'2'},{Name :'In-Progress',Value:'3'}];
  scope = [{Name :'Business Processes',Value:'20'},{Name :'Business Unit',Value:'2'},{Name :'Products & Services',Value:'3'}]
  public addIncidentManagement: FormGroup;

  createdDate: any;

  submitted = false;
  isEdit = false ;
  incidentManagId = 0;
  title = '';
  icon =''
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  buttonTitle: string;
  constructor(private formbuilder:FormBuilder ,private formbuilder1:FormBuilder ,
    private router: Router ,private httpService: HttpRequestService,
    private addModel :AddIncidentModel,private updateModel :UpdateIncidentModel,private route: ActivatedRoute,public snackBar: MatSnackBar
    ) { }

 async   ngOnInit() {
   await this.createBCMProcessForm();
   await   this.route.params.subscribe(params => {
        this.incidentManagId = params['id']?params['id']:0;
        if(this.incidentManagId > 0){
          // this.bindViewData();
          this.title = 'Update Incident Management'
          this.icon = 'edit'
          this.buttonTitle = 'Update '
        } else {
          this.title = 'Add Incident Management'
          this.icon = 'add'
          this.buttonTitle = 'Add '
        }
    });  }
     createDateAsUTC(date:any) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    
     convertDateToUTC(date:any) { 
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
    }
  
    createBCMProcessForm(){
      this.addIncidentManagement=this.formbuilder.group({
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        status: new FormControl(null, [Validators.required]),
        notes: new FormControl(null, [Validators.required]),
        startdate: new FormControl(null, [Validators.required]),
        enddate: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
        priority: new FormControl(null, [Validators.required]),
        source: new FormControl(null, [Validators.required]),
        location: new FormControl(null, [Validators.required]),
        owner: new FormControl(null, [Validators.required]),
      });  
  }
    addUpdate(){
      this.submitted = true;
      if(this.incidentManagId >0){
        this.udateIncidentManagement();
      }  else {
        this.addIncidentManagnt()
      }
    }
    bindViewData(){
      this.httpService.getRequest('GET_ID','INCIDENTVIEW',this.incidentManagId).subscribe(res=>{
        this.createdDate = res.created_Date;
    
        this.addIncidentManagement.patchValue({
          title: res.incident_Title?res.incident_Title :0,
          description: res.incident_Title?res.incident_Title :'',
          status: res.incident_Status_Id?res.incident_Status_Id :'',
          notes: res.notes?res.notes :0,
          startdate: res.start_Date?formatDate(res.start_Date,'yyyy-MM-dd','en') :'',
          enddate: res.closed_Date?formatDate(res.closed_Date,'yyyy-MM-dd','en') :'',
          duration: res.incident_Duration?res.incident_Duration:0,
          category: res.incident_Category_Id?res.incident_Category_Id:0,
          priority: res.incident_Priority_Id?res.incident_Priority_Id:'',
          source: res.incident_Source?res.incident_Source :'',
          location: res.incident_Location?res.incident_Location:0,
          owner: res.incident_Owner?res.incident_Owner:'',
        })
      })
    } 
    get getControls(): { [key: string]: AbstractControl } {
      return this.addIncidentManagement.controls;
    }
    addIncidentManagnt(){
      console.log('1');
     
        if(this.addIncidentManagement.valid){
          this.submitted = true;
          console.log('2');
          this.addModel ={
            incident_Title: this.addIncidentManagement.value.title,
            incident_Description: this.addIncidentManagement.value.description,
            incident_Status_Id: Number(this.addIncidentManagement.value.status),
            start_Date: new Date(this.addIncidentManagement.value.startdate),
            closed_Date: new Date(this.addIncidentManagement.value.enddate),
            incident_Duration: Number(this.addIncidentManagement.value.duration),
            incident_Category_Id: Number(this.addIncidentManagement.value.category),
            incident_Priority_Id:Number(this.addIncidentManagement.value.priority),
            incident_Source:this.addIncidentManagement.value.source,
            incident_Location: this.addIncidentManagement.value.location,
            incident_Owner: Number(this.addIncidentManagement.value.owner),
            notes: this.addIncidentManagement.value.notes,
            created_By: 5,
            created_Date: new Date(),
            modified_By: 0,
            modified_Date: new Date()
          }
          this.httpService.getRequest('POST','INCIDENTADD',this.addModel).subscribe(res=>{
            if(res){
              this.submitted = false;
              this.router.navigate(['/en-us/incident-management/list'])
            } else{
            }
          })
        } else{
          console.log('3');
    
        }
    }
    udateIncidentManagement(){
      if(this.addIncidentManagement.valid){
        console.log('2');
        this.updateModel ={
          incident_ID :Number(this.incidentManagId),
          incident_Title: this.addIncidentManagement.value.title,
          incident_Description: this.addIncidentManagement.value.description,
          incident_Status_Id: Number(this.addIncidentManagement.value.status),
          start_Date: new Date(this.addIncidentManagement.value.startdate),
          closed_Date: new Date(this.addIncidentManagement.value.enddate),
          incident_Duration: Number(this.addIncidentManagement.value.duration),
          incident_Category_Id: Number(this.addIncidentManagement.value.category),
          incident_Priority_Id:Number(this.addIncidentManagement.value.priority),
          incident_Source:this.addIncidentManagement.value.source,
          incident_Location: this.addIncidentManagement.value.location,
          incident_Owner: Number(this.addIncidentManagement.value.owner),
          notes: this.addIncidentManagement.value.notes,
          created_By: 5,
          created_Date: new Date(this.createdDate),
          modified_By: 0,
          modified_Date: new Date()
        }
        this.httpService.getRequest('POST','INCIDENTUPDATE',this.updateModel).subscribe(res=>{
          if(res){
            this.router.navigate(['/en-us/incident-management/list'])
          } else{
          }
        })
      } else{
        console.log('3');
    
      }
    }
    }


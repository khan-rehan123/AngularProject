import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
@Component({
  selector: 'app-addupdatetesting',
  templateUrl: './addupdatetesting.component.html',
  styleUrls: ['./addupdatetesting.component.scss']
})
export class AddupdatetestingComponent implements OnInit {
  public contractAndTree: FormGroup;
  public requirementForm : FormGroup;
  public planTestingForm : FormGroup;
  submitted =false;
  submittedContract = false;
  submittedReq= false;
  submittedPlan= false;
  buttonTitle ='Add';
  icon ='add';
  title = 'Add Business Continuity Testing'
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.createContractAndAllTreeForm();
    this.requirementForms();
    this.planTesting();
  }
  createContractAndAllTreeForm(){
    this.contractAndTree=this.formbuilder.group({
      name: new FormControl(null, [Validators.required]),
      jobTitle: new FormControl(null, [Validators.required]),
      phoneDirect: new FormControl(null, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
      phoneMobile: new FormControl(null, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
      email: new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      notficationTitle: new FormControl(null, [Validators.required]),

      purpose: new FormControl(null, [Validators.required]),

      callInitiator: new FormControl(null, [Validators.required]),

      callReciepent: new FormControl(null, [Validators.required]),
      lastExecuted: new FormControl(null, [Validators.required]),


    }); 
  }
  requirementForms(){
    this.requirementForm=this.formbuilder.group({
      processName: new FormControl(null, [Validators.required]),
      processManager: new FormControl(null, [Validators.required]),
      RTO: new FormControl(null, [Validators.required]),
      RPO: new FormControl(null, [Validators.required]),
      reqName: new FormControl(null, [Validators.required]),
      reqType: new FormControl(null, [Validators.required]),
      reqDesc: new FormControl(null, [Validators.required]),
    }); 
  }
  planTesting(){
    this.planTestingForm=this.formbuilder.group({
      testCycle: new FormControl(null, [Validators.required]),
      lastTestResult: new FormControl(null, [Validators.required]),
      lastPlanTestDate: new FormControl(null, [Validators.required]),
      nextPlanTestDate: new FormControl(null, [Validators.required]),
      testTitle: new FormControl(null, [Validators.required]),
      testDesc: new FormControl(null, [Validators.required]),
      testComplitionDate: new FormControl(null, [Validators.required]),
      overAllStatus: new FormControl(null, [Validators.required]),

      submitter: new FormControl(null, [Validators.required]),

      testResult: new FormControl(null, [Validators.required]),

    }); 
  }
  get getContract(): { [key: string]: AbstractControl } {
    return this.contractAndTree.controls;
  }
  get getReqForm(): { [key: string]: AbstractControl } {
    return this.requirementForm.controls;
  }
  get getTestPlan(): {[key: string]:AbstractControl}{
    return  this.planTestingForm.controls
  } 
  submitContract(tabgroup: MatTabGroup, number: number){
    this.submittedContract = true
    if(this.contractAndTree.valid){
      tabgroup.selectedIndex = number;

    }
  }
  submitReq(tabgroup: MatTabGroup, number: number){
    this.submittedReq =true;
    if(this.requirementForm.valid){
      tabgroup.selectedIndex = number;
    }
  }
  finalSubmit(){
    this.submittedPlan =true;
    if(this.planTestingForm.valid && this.requirementForm.valid && this.contractAndTree.valid){
    console.log('all validdd');
     
    }
}}

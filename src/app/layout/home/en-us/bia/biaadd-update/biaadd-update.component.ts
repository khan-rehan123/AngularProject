import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { BusinessImpactAnalyzeModel } from 'src/app/shared/Model/BusinessImpactAnalize';
import { BusinessImpactAnalizeUpdate } from 'src/app/shared/Model/BusinessImpactAnalizeUpdate';

@Component({
  selector: 'app-biaadd-update',
  templateUrl: './biaadd-update.component.html',
  styleUrls: ['./biaadd-update.component.scss'],
  providers: [BusinessImpactAnalyzeModel, BusinessImpactAnalizeUpdate]

})
export class BiaaddUpdateComponent implements OnInit {
  status = [{ Name: 'Draft', Value: '1' }, { Name: 'Open', Value: '2' }, { Name: 'In-Progress', Value: '3' }];
  scope = [{ Name: 'Business Processes', Value: '20' }, { Name: 'Business Unit', Value: '2' }, { Name: 'Products & Services', Value: '3' }]
  public addBCMProgram: FormGroup;
  submitted = false;
  public dataArray: any;

  public processList: any;
  public BindRPOList: any;
  public projectList: any;
  public ApplicationList: any;
  public AddApplicationOnUi: any = [];
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = ''
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  departmentList = [];
  BcmProgramList = [];
  BCMProgramName: string;
  date: string;
  users = [];
  buttonTitle: string;
  financialImpact = [];
  ImpactParamters = []
  ImpactParamter = [{ Name: 'Financial Impact', Value: '1', Disabled: false }, { Name: 'Strategic Impact', Value: '2', Disabled: false },
  { Name: 'Operational Impact', Value: '3', Disabled: false }, { Name: 'Compliance Impact', Value: '4', Disabled: false }, { Name: 'Reputational Impact', Value: '5', Disabled: false }]
  applicatoinList: any;
  impactParamterHeader = [];
  impactParamterHeaderWithId = []
  financialImpactArry = [{ name: 'F12Hours', desable: false, value: 12, name2: 'Less Than 12 hours' }, { name: 'F24Hours', desable: false, value: 24, name2: 'Upto 24 hours' },
  { name: 'F5days', desable: false, value: 120, name2: 'Upto 5 Days' }, { name: 'F7days', desable: false, value: 160, name2: 'Upto 7 Days' },
  { name: 'Fbeyond7Days', desable: false, value: 170, name2: 'Beyond 7 Days' }]
  stratigicImpactArry = [{ name: 'S12Hours', desable: false, value: 12, name2: 'Less Than 12 hours' }, { name: 'S24Hours', desable: false, value: 24, name2: 'Upto 24 hours' },
  { name: 'S5days', desable: false, value: 120, name2: 'Upto 5 Days' }, { name: 'S7days', desable: false, value: 160, name2: 'Upto 7 Days' },
  { name: 'Sbeyond7Days', desable: false, value: 170, name2: 'Beyond 7 Days' }]
  operationalImpactArry = [{ name: 'O12Hours', desable: false, value: 12, name2: 'Less Than 12 hours' }, { name: 'O24Hours', desable: false, value: 24, name2: 'Upto 24 hours' },
  { name: 'O5days', desable: false, value: 120, name2: 'Upto 5 Days' }, { name: 'O7days', desable: false, value: 160, name2: 'Upto 7 Days' },
  { name: 'Obeyond7Days', desable: false, value: 170, name2: 'Beyond 7 Days' }]
  ComplianceImpactArry = [{ name: 'C12Hours', desable: false, value: 12, name2: 'Less Than 12 hours' }, { name: 'C24Hours', desable: false, value: 24, name2: 'Upto 24 hours' },
  { name: 'C5days', desable: false, value: 120, name2: 'Upto 5 Days' }, { name: 'C7days', desable: false, value: 160, name2: 'Upto 7 Days' },
  { name: 'Cbeyond7Days', desable: false, value: 170, name2: 'Beyond 7 Days' }]

  repImpactArry = [{ name: 'R12Hours', desable: false, value: 12, name2: 'Less Than 12 hours' }, { name: 'R24Hours', desable: false, value: 24, name2: 'Upto 24 hours' },
  { name: 'R5days', desable: false, value: 120, name2: 'Upto 5 Days' }, { name: 'R7days', desable: false, value: 160, name2: 'Upto 7 Days' },
  { name: 'Rbeyond7Days', desable: false, value: 170, name2: 'Beyond 7 Days' }]

  rtoArrayData = [{ name: '12Hours', value: 12, name2: 'Less Than 12 hours' }, { name: '24Hours', value: 24, name2: 'Upto 24 hours' },
  { name: '5days', value: 120, name2: 'Upto 5 Days' }, { name: '7days', value: 160, name2: 'Upto 7 Days' },
  { name: 'beyond7Days', value: 170, name2: 'Beyond 7 Days' }]
  userId: number;
  userRole: number;
  rpoArray: any = [];
  periodArray = [];
  checkValue = 0;
  criticalList = [];
  arrayOfCrictical = [];
  finalCricticalArray = []
  mappingDataForProgram = []
  constructor(private formbuilder: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private BIA: BusinessImpactAnalyzeModel, private BIAUpdate: BusinessImpactAnalizeUpdate, private route: ActivatedRoute, public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.createBCMForm();
    await this.BindBCMprogram();
    await this.getDepartment();
    await this.getusers();
    await this.getImpactParameter();
    await this.ApplicationListBind();
    await this.getImpactOverTime();
    await this.getCriticalDrop();
    await this.getRPOStatusDrop();
    let userDetail = JSON.parse(localStorage.getItem('userDetail'));
    this.userId = userDetail.id;
    this.userRole = userDetail.role_Id
    await this.route.params.subscribe(params => {
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
        this.bindViewData();
        this.title = 'Update Business Impact Analysis';
        this.buttonTitle = 'Update '
        this.icon = 'edit'
      } else {
        this.title = 'Add Business Impact Analysis'
        this.icon = 'add'
        this.buttonTitle = 'Send For Approval '
      }
    });
  }
  getRPOStatusDrop() {
    this.httpService.getRequest('GET', 'GETRPOSTATUD').subscribe((res: any) => {
      this.periodArray = res
    })
  }
  changeFianancial(event, index, givenArray) {
    if (event.value == 22) {
      givenArray.forEach((ele, i) => {
        if (i != index && i > index) {
          ele.desable = true;
          this.addBCMProgram.controls[ele.name].setValue(22)
        }
      })
    } else {
      givenArray.forEach((ele, i) => {
        if (i != index && i > index) {
          ele.desable = false;
          this.addBCMProgram.controls[ele.name].setValue('')
        } else {
          ele.desable = false
        }
      })
    }
  }
  changeImapct(val, event) {
    if (this.arrayOfCrictical.length == 0) {
      this.arrayOfCrictical.push(val.value + '/' + val.name)
    } else {
      let index = this.arrayOfCrictical.indexOf(val.value + '/' + val.name);
      if (index == -1) {
        this.arrayOfCrictical.push(val.value + '/' + val.name)
      } else {
        this.arrayOfCrictical.splice(index, 1)
      }
    }
    this.finalCricticalArray = [];
    this.arrayOfCrictical.forEach(ele => {
      let value = (ele.split('/')[1]).substring(1);
      this.finalCricticalArray.push(value)
    })
    let getValuearray = [];
    this.finalCricticalArray.forEach(ele => {
      this.rtoArrayData.forEach(data => {
        if (ele == data.name)
          getValuearray.push(data.value)
      })
    })
    const min = Math.min(...getValuearray)
    let rto = this.rtoArrayData.filter(ele => ele.value == min)[0]
    if (rto) {
      this.addBCMProgram.patchValue({
        rto: rto.name2
      })
    } else {
      this.addBCMProgram.patchValue({
        rto: ''
      })
    }

  }
  bindViewData() {
    this.httpService.getRequest('GET_ID', 'VIEWBIAPROGRSM', this.bcmprogramId).subscribe(async res => {
      4
      let event = {
        value: res.bcM_Program_ID
      }
      let event2 = {
        value: res.bcM_ProcessId

      }
      await this.BindBCMProject(event);
      await this.BindBCMProcess(event2);
      let data = (this.impactParamterHeaderWithId.filter(ele => (ele.id == Number(res.rtO_Id)))[0])
      console.log(data);
      this.mappingDataForProgram = res.biA_BCM_Program_Mapping
      await this.addBCMProgram.patchValue({
        BIAName: res.biA_NAME ? res.biA_NAME : '',
        BCMProgram: res.bcM_Program_ID ? Number(res.bcM_Program_ID) : 0,
        BCMProject: res.bcM_ProjectId ? res.bcM_ProjectId : 0,
        BCMProcess: res.bcM_ProcessId ? res.bcM_ProcessId : 0,

        F12Hours: res.biA_BCM_Program_Mapping[0].lessthan12hours,
        F24Hours: res.biA_BCM_Program_Mapping[0].upto24hours,
        F5days: res.biA_BCM_Program_Mapping[0].upto5days,
        F7days: res.biA_BCM_Program_Mapping[0].upto7Days,
        Fbeyond7Days: res.biA_BCM_Program_Mapping[0].beyond7Days,

        S12Hours: res.biA_BCM_Program_Mapping[1].lessthan12hours,
        S24Hours: res.biA_BCM_Program_Mapping[1].upto24hours,
        S5days: res.biA_BCM_Program_Mapping[1].upto5days,
        S7days: res.biA_BCM_Program_Mapping[1].upto7Days,
        Sbeyond7Days: res.biA_BCM_Program_Mapping[1].beyond7Days,

        O12Hours: res.biA_BCM_Program_Mapping[2].lessthan12hours,
        O24Hours: res.biA_BCM_Program_Mapping[2].upto24hours,
        O5days: res.biA_BCM_Program_Mapping[2].upto5days,
        O7days: res.biA_BCM_Program_Mapping[2].upto7Days,
        Obeyond7Days: res.biA_BCM_Program_Mapping[2].beyond7Days,


        C12Hours: res.biA_BCM_Program_Mapping[3].lessthan12hours,
        C24Hours: res.biA_BCM_Program_Mapping[3].upto24hours,
        C5days: res.biA_BCM_Program_Mapping[3].upto5days,
        C7days: res.biA_BCM_Program_Mapping[3].upto7Days,
        Cbeyond7Days: res.biA_BCM_Program_Mapping[3].beyond7Days,

        R12Hours: res.biA_BCM_Program_Mapping[4].lessthan12hours,
        R24Hours: res.biA_BCM_Program_Mapping[4].upto24hours,
        R5days: res.biA_BCM_Program_Mapping[4].upto5days,
        R7days: res.biA_BCM_Program_Mapping[4].upto7Days,
        Rbeyond7Days: res.biA_BCM_Program_Mapping[4].beyond7Days,
        // period: ,
        rto: data ? data.status_Name : ''
      })
      let name = this.ApplicationList.filter(ele => ele.id == res.biA_BCM_applications.bcM_Application_ID);
      let periodName = this.periodArray.filter(ele => ele.id == Number(res.biA_BCM_applications.rpO_ID))
      console.log(name, periodName, this.ApplicationList, this.periodArray);

      let dat1 = {
        application: res.biA_BCM_applications.bcM_Application_ID,
        appName: name[0].name,
        period: Number(res.biA_BCM_applications.rpO_ID),
        periodName: periodName[0] ? periodName[0].status_Name : '',
        id: res.biA_BCM_applications.id
      }
      this.rpoArray.push(dat1)

      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[0].beyond7Days }, 4, this.financialImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[0].upto7Days }, 3, this.financialImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[0].upto5days }, 2, this.financialImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[0].upto24hours }, 1, this.financialImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[0].lessthan12hours }, 0, this.financialImpactArry);

      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[1].beyond7Days }, 4, this.stratigicImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[1].upto7Days }, 3, this.stratigicImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[1].upto5days }, 2, this.stratigicImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[1].upto24hours }, 1, this.stratigicImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[1].lessthan12hours }, 0, this.stratigicImpactArry);

      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[2].beyond7Days }, 4, this.operationalImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[2].upto7Days }, 3, this.operationalImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[2].upto5days }, 2, this.operationalImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[2].upto24hours }, 1, this.operationalImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[2].lessthan12hours }, 0, this.operationalImpactArry);

      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[3].beyond7Days }, 4, this.ComplianceImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[3].upto7Days }, 3, this.ComplianceImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[3].upto5days }, 2, this.ComplianceImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[3].upto24hours }, 1, this.ComplianceImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[3].lessthan12hours }, 0, this.ComplianceImpactArry);

      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[4].beyond7Days }, 4, this.repImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[4].upto7Days }, 3, this.repImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[4].upto5days }, 2, this.repImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[4].upto24hours }, 1, this.repImpactArry)
      this.changeFianancialOnEdit({ value: res.biA_BCM_Program_Mapping[4].lessthan12hours }, 0, this.repImpactArry);

    })
  }
  changeFianancialOnEdit(event, index, givenArray) {
    if (event.value == 22) {
      givenArray.forEach((ele, i) => {
        if (i != index && i > index) {
          ele.desable = true;
          this.addBCMProgram.controls[ele.name].setValue(22)
        }
      })
    } else {
    }
  }
  get getControls(): { [key: string]: AbstractControl } {
    return this.addBCMProgram.controls;
  }
  createBCMForm() {

    this.addBCMProgram = this.formbuilder.group({
      BIAName: new FormControl(null, [Validators.required]),
      BCMProject: new FormControl(null, [Validators.required]),
      BCMProcess: new FormControl(null, [Validators.required]),
      BCMProgram: new FormControl(null, [Validators.required]),
      F12Hours: new FormControl(23),
      F5days: new FormControl(23),
      F7days: new FormControl(23),
      Fbeyond7Days: new FormControl(23),
      F24Hours: new FormControl(23),
      S12Hours: new FormControl(23),
      S5days: new FormControl(23),
      S7days: new FormControl(23),
      Sbeyond7Days: new FormControl(23),
      S24Hours: new FormControl(23),
      C12Hours: new FormControl(23),
      C5days: new FormControl(23),
      C7days: new FormControl(23),
      Cbeyond7Days: new FormControl(23),
      C24Hours: new FormControl(23),
      O12Hours: new FormControl(23),
      O5days: new FormControl(23),
      O7days: new FormControl(23),
      Obeyond7Days: new FormControl(23),
      O24Hours: new FormControl(23),
      R12Hours: new FormControl(23),
      R5days: new FormControl(23),
      R7days: new FormControl(23),
      Rbeyond7Days: new FormControl(23),
      R24Hours: new FormControl(23),
      application: new FormControl(null),
      period: new FormControl(null),
      rto: new FormControl('Beyond 7 Days')
    });

  }
  BindRPOTime(event) {
    this.httpService.getRequest('GET', 'ListRPOTime', `ApplicationId=${event.value}`).subscribe(res => {
      this.BindRPOList = res;
      alert(res)
    }, (err) => {
    })
  }
  addRPO() {
    if (this.addBCMProgram.value.application && this.addBCMProgram.value.period) {
      let name = this.ApplicationList.filter(ele => ele.id == this.addBCMProgram.value.application);
      let periodName = this.periodArray.filter(ele => ele.id == this.addBCMProgram.value.period);

      let data = {
        application: this.addBCMProgram.value.application,
        appName: name[0].name,
        period: this.addBCMProgram.value.period,
        periodName: periodName[0].status_Name
      }
      this.rpoArray.push(data);
    } else {
      this.snackBar.open('Please select Application and Period', 'Error', {
        duration: 2000,
      })
    }

  }
  removeRPO(i) {
    this.rpoArray.splice(i, 1);;
  }
  addUpdate() {
    console.log(this.addBCMProgram.value);
    if (this.bcmprogramId > 0) {
      this.UpdateProgramBCM();
    } else {
      this.BCMProgramAdd();
    }
  }
  UpdateProgramBCM() {
    let RPOarrayNew = [];
    this.rpoArray.forEach(element => {
      let data =
      {
        id: element.id,
        bcM_Application_ID: element.application,
        biA_ID: Number(this.bcmprogramId),
        rpO_ID: element.period
      }
      RPOarrayNew.push(data);
    });
    this.submitted = true;
    let biaUpdatemodel = {
      biA_ID: Number(this.bcmprogramId),
      biA_NAME: this.addBCMProgram.value.BIAName,
      bcM_Program_ID: Number(this.addBCMProgram.value.BCMProgram),
      bcM_ProjectId: Number(this.addBCMProgram.value.BCMProject),
      bcM_ProcessId: Number(this.addBCMProgram.value.BCMProcess),
      biA_Status: 0,
      created_By: this.userId,
      created_Date: new Date().toISOString(),
      modified_By: this.userId,
      modified_Date: new Date().toISOString(),
      rtO_Id: this.getRPOID(this.addBCMProgram.value.rto),
      returnComments: '',
      biA_BCM_Program_MappingUI: [
        {
          id: this.mappingDataForProgram[0].id,
          impactparameterId: this.getImpactParamterId('Financial Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.F12Hours),
          upto24hours: Number(this.addBCMProgram.value.F24Hours),
          upto5days: Number(this.addBCMProgram.value.F5days),
          upto7Days: Number(this.addBCMProgram.value.F7days),
          beyond7Days: Number(this.addBCMProgram.value.Fbeyond7Days),
          biA_ID: Number(this.bcmprogramId),
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: this.mappingDataForProgram[1].id,
          impactparameterId: this.getImpactParamterId('Strategic Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.S12Hours),
          upto24hours: Number(this.addBCMProgram.value.S24Hours),
          upto5days: Number(this.addBCMProgram.value.S5days),
          upto7Days: Number(this.addBCMProgram.value.S7days),
          beyond7Days: Number(this.addBCMProgram.value.Sbeyond7Days),
          biA_ID: Number(this.bcmprogramId),
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: this.mappingDataForProgram[2].id,
          impactparameterId: this.getImpactParamterId('Operational Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.O12Hours),
          upto24hours: Number(this.addBCMProgram.value.O24Hours),
          upto5days: Number(this.addBCMProgram.value.O5days),
          upto7Days: Number(this.addBCMProgram.value.O7days),
          beyond7Days: Number(this.addBCMProgram.value.Obeyond7Days),
          biA_ID: Number(this.bcmprogramId),
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: this.mappingDataForProgram[3].id,
          impactparameterId: this.getImpactParamterId('Compliance Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.C12Hours),
          upto24hours: Number(this.addBCMProgram.value.C24Hours),
          upto5days: Number(this.addBCMProgram.value.C5days),
          upto7Days: Number(this.addBCMProgram.value.C7days),
          beyond7Days: Number(this.addBCMProgram.value.Cbeyond7Days),
          biA_ID: Number(this.bcmprogramId),
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: this.mappingDataForProgram[4].id,
          impactparameterId: this.getImpactParamterId('Reputational Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.R12Hours),
          upto24hours: Number(this.addBCMProgram.value.R24Hours),
          upto5days: Number(this.addBCMProgram.value.R5days),
          upto7Days: Number(this.addBCMProgram.value.R7days),
          beyond7Days: Number(this.addBCMProgram.value.Rbeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        }
      ],
      biA_Application_MappingUI: RPOarrayNew
    }
    this.httpService.getRequest('POST', 'UPDATEBIAPROGRAM', biaUpdatemodel).subscribe(res => {
      if (res) {
        this.submitted = false;
        this.addBCMProgram.reset();
        this.router.navigate(['/en-us/bia/list']);
        this.snackBar.open('BIA Program Updated Succesfully', 'Success', {
          duration: 2000,
        })
      }
    })

  }
  getImpactParamterId(name) {
    let data = (this.ImpactParamters.filter(ele => ele.status_Name == name)[0])
    return data.id
  }
  getRPOID(name: string) {
    let data = (this.impactParamterHeaderWithId.filter(ele => (ele.status_Name.toLowerCase() == name.toLowerCase()))[0])
    return data.id
  }
  BCMProgramAdd() {
    let RPOarrayNew = [];
    this.rpoArray.forEach(element => {
      let data =
      {
        id: 0,
        bcM_Application_ID: element.application,
        biA_ID: 0,
        rpO_ID: element.period
      }
      RPOarrayNew.push(data);
    });
    this.submitted = true;
    console.log(this.addBCMProgram.value);
    let biaAddmodel = {
      biA_ID: 0,
      biA_NAME: this.addBCMProgram.value.BIAName,
      bcM_Program_ID: Number(this.addBCMProgram.value.BCMProgram),
      bcM_ProjectId: Number(this.addBCMProgram.value.BCMProject),
      bcM_ProcessId: Number(this.addBCMProgram.value.BCMProcess),
      biA_Status: 0,
      created_By: this.userId,
      created_Date: new Date().toISOString(),
      modified_By: this.userId,
      modified_Date: new Date().toISOString(),
      rtO_Id: this.getRPOID(this.addBCMProgram.value.rto),
      returnComments: '',
      biA_BCM_Program_MappingUI: [
        {
          id: 0,
          impactparameterId: this.getImpactParamterId('Financial Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.F12Hours),
          upto24hours: Number(this.addBCMProgram.value.F24Hours),
          upto5days: Number(this.addBCMProgram.value.F5days),
          upto7Days: Number(this.addBCMProgram.value.F7days),
          beyond7Days: Number(this.addBCMProgram.value.Fbeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: 0,
          impactparameterId: this.getImpactParamterId('Strategic Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.S12Hours),
          upto24hours: Number(this.addBCMProgram.value.S24Hours),
          upto5days: Number(this.addBCMProgram.value.S5days),
          upto7Days: Number(this.addBCMProgram.value.S7days),
          beyond7Days: Number(this.addBCMProgram.value.Sbeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: 0,
          impactparameterId: this.getImpactParamterId('Operational Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.O12Hours),
          upto24hours: Number(this.addBCMProgram.value.O24Hours),
          upto5days: Number(this.addBCMProgram.value.O5days),
          upto7Days: Number(this.addBCMProgram.value.O7days),
          beyond7Days: Number(this.addBCMProgram.value.Obeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: 0,
          impactparameterId: this.getImpactParamterId('Compliance Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.C12Hours),
          upto24hours: Number(this.addBCMProgram.value.C24Hours),
          upto5days: Number(this.addBCMProgram.value.C5days),
          upto7Days: Number(this.addBCMProgram.value.C7days),
          beyond7Days: Number(this.addBCMProgram.value.Cbeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        },
        {
          id: 0,
          impactparameterId: this.getImpactParamterId('Reputational Impact'),
          lessthan12hours: Number(this.addBCMProgram.value.R12Hours),
          upto24hours: Number(this.addBCMProgram.value.R24Hours),
          upto5days: Number(this.addBCMProgram.value.R5days),
          upto7Days: Number(this.addBCMProgram.value.R7days),
          beyond7Days: Number(this.addBCMProgram.value.Rbeyond7Days),
          biA_ID: 0,
          created_By: this.userId,
          created_Date: new Date().toISOString(),
          modified_By: this.userId,
          modified_Date: new Date().toISOString()
        }
      ],
      biA_Application_MappingUI: RPOarrayNew
    }
    console.log(biaAddmodel, 'biaAddmodel');
    if (this.addBCMProgram.valid) {
      this.httpService.getRequest('POST', 'BusinessImpactAnalysis', biaAddmodel).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.addBCMProgram.reset();
          localStorage.setItem("bcmprogramname", res.bcM_Program_Name);
          this.router.navigate(['/en-us/bia/list'])
          this.snackBar.open('BCM Program Added Succesfully', 'Success', {
            duration: 2000,
          })
        }

      }, err => {
        this.snackBar.open(err, 'Error', {
          duration: 2000,
        })
      })
    } else {
      this.submitted = false;
      this.snackBar.open('Please Fill all field', 'Error', {
        duration: 2000,
      })
    }
  }
  ApplicationListBind() {
    this.httpService.getRequest('GET', 'LISTBCMAPPLICATION').subscribe(res => {
      res.forEach(element => {
        element.isDisabled = false;
      });
      this.ApplicationList = res;
      console.log(this.ApplicationList);

    }, (err) => {
    })
  }
  getDepartment() {
    this.httpService.getRequest('GET', 'GETDEPARTMENT').subscribe(res => {
      this.departmentList = res;
    })
  }
  getBCMPRogram() {
    this.httpService.getRequest('GET', 'GETBCMPROGRAMLIST').subscribe((res: any) => {
      this.BcmProgramList = res;
    })
  }
  getusers() {
    this.httpService.getRequest('GET', 'USERLIST').subscribe((res: any) => {
      this.users = res
    })
  }

  BindBCMProcess(event) {
    this.httpService.getRequest('GET', 'LISTBCMPROCESSBYID', `projectId=${event.value}`).subscribe(res => {

      this.processList = res;
    }, (err) => {
    })
  }
  BindBCMProject(event) {
    debugger;

    this.httpService.getRequest('GET', 'LISTBCMPROJECTBYID', `programId=${event.value}`).subscribe(res => {

      this.projectList = res;
      debugger;

    }, (err) => {
    })
  }
  BindBCMApplication(event) {
    let data = {
      programId: event.value
    }
    this.httpService.getRequest('GET', 'LISTBCMAPPLICTIONBYID', `processtId=${event.value}`).subscribe(res => {
      res.forEach(data => {
        data.desabled = false;
      })
      this.applicatoinList = res;
    }, (err) => {
    })
  }
  BindBCMprogram() {
    this.httpService.getRequest('GET', 'GETBCMPROGRAMLIST').subscribe(res => {
      this.dataArray = res;
    }, (err) => {
    })
  }
  getImpactParameter() {
    this.httpService.getRequest('GET', 'GETIMPACTPARAMETER').subscribe(res => {
      this.ImpactParamters = res;
    }, (err) => {
    })
  }
  getCriticalDrop() {
    this.httpService.getRequest('GET', 'CRITICAL').subscribe(res => {
      this.criticalList = res;
    }, (err) => {
    })
  }
  getImpactOverTime() {
    this.httpService.getRequest('GET', 'IMPACTOVERTIME').subscribe(res => {
      res.forEach(element => {
        this.impactParamterHeader.push(element.status_Name);
        this.impactParamterHeaderWithId.push(element)
      });
    }, (err) => {
    })
  }
  // selectImpact() {
  //   let quantityArray = [];
  //   this.rpoArray.forEach(data => {
  //     quantityArray.push(data.application)
  //   })
  //   this.financialImpact = []
  //   this.ApplicationList.forEach(res => {
  //     if (quantityArray.includes(res.Value)) {
  //       this.financialImpact.push(res)
  //       res.Disabled = true;
  //     }
  //     else {
  //       res.Disabled = false;
  //     }
  //   })
  // }
}



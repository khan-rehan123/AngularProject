import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { BCMStratigyUpdateModel } from 'src/app/shared/Model/Stratigy';
@Component({
  selector: 'app-business-stratigiesadd',
  templateUrl: './business-stratigiesadd.component.html',
  styleUrls: ['./business-stratigiesadd.component.scss'],
  providers: [BCMStratigyUpdateModel]
})
export class BusinessStratigiesaddComponent implements OnInit {
  public recoveryStrategy: FormGroup;

  buttonTitle = 'Add';
  icon = 'add';
  title = 'Add Business Continuity Stratigies'
  cncTitile='Cancel'
  userDetail: any = '';
  localUserId: any;
  userID = 0;
  bcmprogramId = 0;
   
  public RoleID:number;
  constructor(private formbuilder: FormBuilder,
    private router: Router, private httpService: HttpRequestService,
    private bcMStratigyUpdate: BCMStratigyUpdateModel,
    private route: ActivatedRoute, public snackBar: MatSnackBar) { }
  submitted = false;
  ngOnInit() {
    this.userDetail = (localStorage.getItem('userDetail'))
 

    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.RoleID=data.role_Id;
    this.createRecoverySt();
    let userData = JSON.parse(localStorage.getItem('userDetail'));
    this.userID = Number(userData.id);
    this.route.params.subscribe(params => {
      debugger;
      this.bcmprogramId = params['id'] ? params['id'] : 0;
      if (this.bcmprogramId > 0) {
        this.bindViewData();
        this.title = 'Update Business continuity strategy '  
        this.icon = 'edit'
        this.buttonTitle = 'Update And Send For Approval'

      } else {
        this.title = 'Add Business continuity strategy'
        this.icon = 'add'
        this.buttonTitle = 'Send For Approval '
      }
    });

  }
  createRecoverySt() {
    this.recoveryStrategy = this.formbuilder.group({
      strategyName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),

    });
  }
  get getControls(): { [key: string]: AbstractControl } {
    return this.recoveryStrategy.controls;
  }
  addUpdate() {
    if (this.bcmprogramId > 0) {
      this.UpdateStratigy();
    } else {
      this.submitContract();
    }
  }
  submitContract() {
    if (this.recoveryStrategy.valid) {
      let addModel = {
        strategy_Statement: this.recoveryStrategy.value.strategyName,
        strategyDescription: this.recoveryStrategy.value.description,
        created_By: Number(this.userID),
        created_Date: new Date(),
        modified_By: this.userID,
        modified_Date: new Date()
      }
      this.httpService.getRequest('POST', 'ADDBCMStratigy', addModel).subscribe(res => {
        if (res) {
          this.snackBar.open('Stratigy Added Successfully', 'Success');
          this.router.navigate(['/en-us/businessStratigies/list'])
        }
      }, err => {
        this.snackBar.open(err, 'ERROR')
      })
    }
  }
  bindViewData() {
    this.httpService.getRequest('GET_ID', 'ViewbusinessStratigy', this.bcmprogramId).subscribe(res => {
      debugger;
      console.log(res);
      this.recoveryStrategy.patchValue({
        strategyName: res.strategy_Statement ? res.strategy_Statement : '',
        description: res.strategyDescription ? res.strategyDescription : '',
      })
    })
  }
  UpdateStratigy() {
    this.submitted = true;
    if (this.recoveryStrategy.valid) {
      this.bcMStratigyUpdate = {
        strategy_ID: Number(this.bcmprogramId),
        strategy_Statement: this.recoveryStrategy.value.strategyName,
        strategyDescription: this.recoveryStrategy.value.description,
        created_By: Number(this.userID),
        created_Date: new Date(),
        modified_By: Number(this.userID),
        modified_Date: new Date()
      }
      this.httpService.getRequest('POST', 'UpdateBCMStratigy', this.bcMStratigyUpdate).subscribe(res => {
        if (res) {
          this.submitted = false;
          this.recoveryStrategy.reset();
          this.router.navigate(['/en-us/businessStratigies/list'])
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
}

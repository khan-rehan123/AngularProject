import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/http-request.service';
@Component({
  selector: 'app-bcm-view',
  templateUrl: './bcm-view.component.html',
  styleUrls: ['./bcm-view.component.scss']
})
export class BcmViewComponent implements OnInit {

  submitted = false;
  isEdit = false;
  bcmprogramId = 0;
  title = '';
  icon = '';
  BCMViewData = [];
  bcM_Program_Name: any;
  bcM_Actual_CompletionDate: any;
  bcM_Next_Review_Due_Date: any;
  bcM_Program_Description: any;

  bcM_Program_Manager: any;

  bcM_Program_Owner: any;
  bcM_Program_Region: any;
  bcM_Program_StartDate: any;
  bcM_Program_Status: any;
  created_By: any;
  created_Date: any;
  last_Review_Date: any;
  review_Period_Days:number;
  constructor(private router: Router, private httpService: HttpRequestService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.title = 'Application Details';
    this.icon = 'add';
    this.route.params.subscribe(params => {
      debugger;
      this.bcmprogramId = params['id'] ? params['id'] : 0;
    });
    this.bindViewData(this.bcmprogramId);

  }
  bindViewData(id) {
    this.httpService.getRequest('GET_ID', 'VIEWBCMPROGRSM', id).subscribe(res => {
      debugger;
      this.BCMViewData = res;
      this.bcM_Program_Name = res.bcM_Program_Name;
      this.bcM_Actual_CompletionDate = res.bcM_Actual_CompletionDate;
      this.bcM_Next_Review_Due_Date = res.bcM_Next_Review_Due_Date;
      this.bcM_Program_Description = res.bcM_Program_Description; 
      this.bcM_Program_Manager = res.bcM_Program_Manager;
   
      this.bcM_Program_Owner = res.bcM_Program_Owner;
      this.bcM_Program_Region = res.bcM_Program_Region;
      this.bcM_Program_StartDate = res.bcM_Program_StartDate;
      this.bcM_Program_Status = res.bcM_Program_Status;
      this.created_By = res.created_By;
      this.created_Date = res.created_Date;
      this.last_Review_Date = res.last_Review_Date;
      this.review_Period_Days=res.review_Period_Days;
    })
  }
}

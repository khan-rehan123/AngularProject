import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { disk_space } from '../dashboard.data';

@Component({
  selector: 'app-disk-space',
  templateUrl: './disk-space.component.html'
})
export class DiskSpaceComponent implements OnInit {
  public data: any[]; 
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['green', 'red']
  }; 
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false; 
  @ViewChild('resizedDiv', { static: true }) resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  
  constructor() { }

  ngOnInit(){
    this.data = disk_space;  
  }
  
  public onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.data = [...disk_space] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
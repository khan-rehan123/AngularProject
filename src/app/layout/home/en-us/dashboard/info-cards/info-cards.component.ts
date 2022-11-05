import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { orders, products, customers, refunds ,single} from '../dashboard.data';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit { 
  single: any[];
  view: any[] = [700, 400];

 
  public multi: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Category';
  public showYAxisLabel = true;
  public yAxisLabel = 'Count';
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };  
 

  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
 
  public autoScale = true;
  @ViewChild('resizedDiv', { static: true }) resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  public settings: Settings;
  constructor(public appSettings:AppSettings){
   
    this.settings = this.appSettings.settings; 
    
  }

  ngOnInit(){
    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.single=single;
    this.orders = this.addRandomValue('orders');     
    this.customers = this.addRandomValue('customers');
  }
  
  

 
  
  public onSelect(event) {
    console.log(event);
  }
  public addRandomValue(param) {
    switch(param) {
      case 'orders':
        for (let i = 1; i < 30; i++) { 
          this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.orders;
      case 'customers':
        for (let i = 1; i < 15; i++) { 
          this.customers[0].series.push({"name": 2000+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.customers;
      default:
        return this.orders;
    }
  }

  ngOnDestroy(){
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.orders = [...orders] ); 
      setTimeout(() => this.products = [...products] ); 
      setTimeout(() => this.customers = [...customers] ); 
      setTimeout(() => this.refunds = [...refunds] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
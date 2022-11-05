import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-flags-menu',
  templateUrl: './flags-menu.component.html',
  styleUrls: ['./flags-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnChanges {

  public settings: Settings;
  constructor(public appSettings:AppSettings){
      this.settings = this.appSettings.settings; 
  }

  ngOnChanges() {
  }

}

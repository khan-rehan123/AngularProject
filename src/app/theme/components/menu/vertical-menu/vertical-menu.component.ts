import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class VerticalMenuComponent implements OnChanges {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  @Input('rtl') rtl;

  parentMenu:Array<any>;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public menuService:MenuService) { 
    this.settings = this.appSettings.settings;
  }

  ngOnChanges() {     
    this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);  
    console.log(this.menuItems);
    
  }
  onClick(menuId){
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);    
  }

}

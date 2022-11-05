import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidenavComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  userDetail  :any='';
  Name :any='';
  email :any ='';
  public menuItems:Array<any>;
  public menutItemsArabic:Array<any>;
  Role:any='';
  public settings: Settings;
  @Input('rtl') rtl:any;
  constructor(public appSettings:AppSettings, public menuService:MenuService){
      this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    let roleID = JSON.parse(localStorage.getItem('userDetail'))
    console.log(roleID);
    
    if(roleID.role_Id !=1){
      this.menuItems = this.menuService.getVerticalMenuItems();  
      this.menutItemsArabic = this.menuService.getVerticalMenuItemsArabic(); 

    } else {
      this.menuItems = this.menuService.getVerticalMenuItemsAdmin();  
      this.menutItemsArabic = this.menuService.getVerticalMenuItemsArabicAdmin(); 

    }
    console.log(this.menutItemsArabic);
    
    this.userDetail = (localStorage.getItem('userDetail'))
    let data = JSON.parse(this.userDetail)
    this.Name =  `${data.firstName} ${data.lastName}`
    this.email =`${data.username}`  
    this.Role=`${data.roleName}`
  }

  ngDoCheck(){
    if(this.settings.fixedSidenav){
      if(this.psConfig.wheelPropagation == true){
        this.psConfig.wheelPropagation = false;
      }      
    }
    else{
      if(this.psConfig.wheelPropagation == false){
        this.psConfig.wheelPropagation = true;
      }  
    }
  }

  public closeSubMenus(){
    let menu = document.getElementById("vertical-menu");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

}

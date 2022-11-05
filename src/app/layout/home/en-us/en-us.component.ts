
import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { rotate } from 'src/app/theme/utils/app-animation';

@Component({
  selector: 'app-en-us',
  templateUrl: './en-us.component.html',
  styleUrls: ['./en-us.component.scss'],
  animations: [ rotate ],
  providers: [ MenuService ]
})
export class EnUsComponent implements OnInit { 
  @ViewChild('sidenav', { static: false }) sidenav:any;  
  @ViewChild('backToTop', { static: true }) backToTop:any;  
  @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>;
  public optionsPsConfig: PerfectScrollbarConfigInterface = {};
  public settings:Settings;
  public showSidenav:boolean = false;
  public showInfoContent:boolean = false;
  public toggleSearchBar:boolean = false;
  private defaultMenu:string; //declared for return default menu when window resized 
  public menus = ['vertical', 'horizontal'];
  public menuOption:string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption:string;

  constructor(public appSettings:AppSettings, public router:Router, private menuService: MenuService){        
    this.settings = this.appSettings.settings;
    console.log(this.settings);
    
  }
  
  ngOnInit() {
    this.optionsPsConfig.wheelPropagation = false;
    if(window.innerWidth <= 960){
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu; 
    this.menuTypeOption = this.settings.menuType; 
    this.defaultMenu = this.settings.menu;
  }

  ngAfterViewInit(){
    setTimeout(() => { this.settings.loadingSpinner = false }, 300); 
    this.backToTop.nativeElement.style.display = 'none'; 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      } 
      if(window.innerWidth <= 960){
        this.sidenav.close(); 
      }                
    });
    if(this.settings.menu == "vertical")
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems()); 
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public chooseMenu(){
    this.settings.menu = this.menuOption; 
    this.defaultMenu = this.menuOption;
    if(this.menuOption == 'horizontal'){
      this.settings.fixedSidenav = false;
    }
    this.router.navigate(['/']); 
  }

  public chooseMenuType(){
    this.settings.menuType = this.menuTypeOption;
  }

  public changeTheme(theme){
    this.settings.theme = theme;       
  }
  
  public closeInfoContent(showInfoContent){
    this.showInfoContent = !showInfoContent;
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical'
    }
    else{
      (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical'
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }

  public onPsScrollY(event){   
    (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
  }

  public scrollToTop() {
    this.pss.forEach(ps => {
      if(ps.elementRef.nativeElement.id == 'main'){
        ps.scrollToTop(0,250);
      }
    });
  }
  
  public closeSubMenus(){
    if(this.settings.menu == "vertical"){
      this.menuService.closeAllSubMenus();
    }      
  }
}
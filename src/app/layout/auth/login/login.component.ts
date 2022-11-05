
import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { HttpRequestService } from 'src/app/shared/http-request.service';
import { UserAuthenService } from 'src/app/shared/user-authen.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { rotate } from 'src/app/theme/utils/app-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [rotate],
  providers: [MenuService]
})
export class LoginComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: any;
  @ViewChild('backToTop', { static: true }) backToTop: any;
  @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>;
  public optionsPsConfig: PerfectScrollbarConfigInterface = {};
  public settings: Settings;
  public showSidenav: boolean = false;
  public showInfoContent: boolean = false;
  public toggleSearchBar: boolean = false;
  private defaultMenu: string; //declared for return default menu when window resized 
  public menus = ['vertical', 'horizontal'];
  public menuOption: string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption: string;
  public form: FormGroup;
  private _islogin = new BehaviorSubject<boolean>(false);
  islogin = this._islogin.asObservable()
  isLoading = false;
  constructor(public appSettings: AppSettings, public router: Router,
    private menuService: MenuService, public fb: FormBuilder, private auth: UserAuthenService, private httpService: HttpRequestService, public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  ngOnInit() {
    // if(this.auth.islogin){this.router.navigate(['en-us/dashboard'])}
    this.optionsPsConfig.wheelPropagation = false;
    if (window.innerWidth <= 960) {
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu;
    this.menuTypeOption = this.settings.menuType;
    this.defaultMenu = this.settings.menu;
  }
  ngAfterViewInit() {
    setTimeout(() => { this.settings.loadingSpinner = false }, 300);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      }
      if (window.innerWidth <= 960) {
        this.sidenav.close();
      }
    });
    if (this.settings.menu == "vertical")
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public chooseMenu() {
    this.settings.menu = this.menuOption;
    this.defaultMenu = this.menuOption;
    if (this.menuOption == 'horizontal') {
      this.settings.fixedSidenav = false;
    }
    this.router.navigate(['/']);
  }

  public chooseMenuType() {
    this.settings.menuType = this.menuTypeOption;
  }

  public changeTheme(theme) {
    this.settings.theme = theme;
  }

  public closeInfoContent(showInfoContent) {
    this.showInfoContent = !showInfoContent;
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 960) {
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical'
    }
    else {
      (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical'
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }


  userLogin() {
    // this.auth.login(this.formValue.value.username,this.formValue.value.password)
    this.isLoading = true;
    this.httpService.getRequest('POST', 'LOGIN', this.form.value).subscribe(res => {
      if (typeof (res.jwtToken) != "undefined") {
        debugger;
        setTimeout(() => {
          this.isLoading = false
          localStorage.setItem('usertoken', res.jwtToken)
          localStorage.setItem('userDetail', JSON.stringify(res));
          this._islogin.next(true)
          this.router.navigate(['en-us/dashboard']);
          this.snackBar.open('You Have loggedIn Successfulyy', 'Success', {
            duration: 2000,
          });
        }, 100);
      }
    }, (err => {
      this.isLoading = false
      setTimeout(() => {
      }, 1000);
    }))

  }
}
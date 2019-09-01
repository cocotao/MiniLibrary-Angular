import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  private wechatRedirectPath: string;
  public isActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (window.localStorage.getItem('code') && window.localStorage.getItem('code').length > 0) {
      this.isActive = false;
    }
    this.wechatRedirectPath = this.initWechatRedirectPath();
  }

  // TODO get router parm from tab-navigator
  // if (redirect from tab-navigator) {
  //   this.isActive = true;
  // }

  initWechatRedirectPath(): string {
    const redirectPage = 'wechatAuthorization';
    const returnUri = 'http://www.ltvision123.com/' + redirectPage;
    const AppID = 'wx88094ad370bf30a8';
    const scope = 'snsapi_userinfo';
    const wechatPath = 'https://open.weixin.qq.com/connect/oauth2/authorize'
      + '?appid=' + AppID
      + '&redirect_uri=' + returnUri
      + '&response_type=code'
      + '&scope=' + scope
      + '&state=STATE&connect_redirect=1#wechat_redirect';

    return wechatPath;
  }

  onClickWechatLogin(): void {
    this.isActive = false;
    window.location.assign(this.wechatRedirectPath);
  }

  onClickMockWechatLogin(): void {
    this.router.navigate(['/wechatAuthorization'], { queryParams: { code: '123456789', state: 'STATE' } });
  }

}

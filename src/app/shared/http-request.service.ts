import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { APIURLS } from './apiurl/apiurl';

@Injectable()

export class HttpRequestService {
	constructor(	private http: HttpClient,  private myRoute: Router, ) { }

	getApi(apiName: string) {
		const Url = APIURLS[apiName];
		return Url;
	}
	getRequest(type: string, requestUrl: string, data?: any, queryParams = ''): Observable<any> {
		if (type === 'GET') { 
			return this.http.get<any>(this.getApi(requestUrl) + queryParams + '?' + data);
		} else if (type === 'POST') {
			return this.http.post<any>(this.getApi(requestUrl), data);
		} else if (type === 'POST_WITHDATA') {
			return this.http.post<any>(this.getApi(requestUrl) + '/' + queryParams, data);
		} else if (type === 'PUT') {
			return this.http.put<any>(this.getApi(requestUrl) + '/' + queryParams, data);
		}else if (type === 'PATCH') {
			return this.http.patch<any>(this.getApi(requestUrl) + '/' + queryParams, data);
		} else if (type === 'PUT_WITHDATA') {
			return this.http.put<any>(this.getApi(requestUrl), data);
		} else if (type === 'DELETE') {
			return this.http.delete<any>(this.getApi(requestUrl) + queryParams + '?' + data);
		} else if (type === 'GET_ID') { 
			return this.http.get<any>(this.getApi(requestUrl) + '/' + data);
		} else{
			return this.http.put<any>(this.getApi(requestUrl) + '/' + data,'');
		}
	}

	/**
	 * Logs out the user and clear credentials.
	 */
	logout() {
		// Customize credentials invalidation here
		localStorage.clear();
		this.myRoute.navigate(['auth/login']);
	}
	isLoggednIn() {
		if(localStorage.getItem('usertoken')) {
			return true
		} else {
			this.myRoute.navigate(['auth/login']);
			return false
		}
	}
	// showError(errormsg: string, err?: string, timeOut?: number) {
	// 	return this.toaster.errorToastr(errormsg, err, {
	// 		position: 'bottom-center',
	// 		animate: 'slideFromTop', showCloseButton: true, toastTimeout: timeOut, maxShown:1
	// 	});
	// }

	// showSuccess(successmsg: string, sucessBody?: string, timeOut?: number) {
	// 	this.toaster.successToastr(successmsg, sucessBody, {
	// 		position: 'bottom-center',
	// 		animate: 'slideFromTop', showCloseButton: true, toastTimeout: timeOut
	// 	});
	// }


}
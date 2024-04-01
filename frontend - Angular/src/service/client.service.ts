import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Cliente } from './../model/client.model';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from 'jwt-decode'
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { Token } from '@angular/compiler';
import { token } from './../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost:3000/clientes'
  loginUrl = 'http://localhost:3000/login/'

  constructor(
    private message: MessageService,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService
  ) { }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl + '/post', cliente).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  read(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl + '/all').pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }
 
  readById(id: number): Observable<Cliente> {
    const url = `${this.baseUrl}/?id=${id}`
    return this.http.get<Cliente>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/update/?id=${cliente.id}`
    return this.http.patch<Cliente>(url, cliente).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Cliente> {
    const url = `${this.baseUrl}/delete/?id=${id}`
    return this.http.delete<Cliente>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  forgetPassword(user: any): Observable<any>{
    return this.http.patch<any>(`${this.loginUrl}reset`, user).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  validToken(token: String): Observable<Token>{
    return this.http.post<Token>(`${this.loginUrl}reset/token`, token).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }
 
  resetPassword(user: any): Observable<any>{
    return this.http.patch<any>(`${this.loginUrl}reset/change`, user).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    if (e.statusText == 'Unknown Error') {
      this.message.showMessage('Falha na conexão com a API.', true);
      this.spinner.hide()
      return EMPTY
    } if(e.error.message == 'Não tem permissão.'){
      this.spinner.hide()
      this.router.navigate(['/acesso-negado'])
      return EMPTY
    }
     else {
      this.message.showMessage(e.error.message, true);
      this.spinner.hide()
      return EMPTY
    }
  }

  getAuthToken() {
    const token = this.localStorage.get('token')
    return token;
  }

  getAuthRole() {
    const role = this.localStorage.get('role')
    return role;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp)
    return date;
  }

  isTokenExpired(token?: string): boolean {

    if (!token) {
      return true
    }

    const date = this.getTokenExpirationDate(token)
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.localStorage.get('token');

    if (!token) {
      return false;
    }
    else if (this.isTokenExpired(token)) {
      return false;
    }

    return true
  }

}

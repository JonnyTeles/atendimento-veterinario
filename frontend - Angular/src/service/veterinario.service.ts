import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Veterinario } from 'src/model/veterinario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  baseUrl = 'http://localhost:3000/veterinarios'
  loginUrl = 'http://localhost:3000/login/'

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    private message: MessageService
  ) { }

  create(veterinario: Veterinario): Observable<Veterinario>{
    return this.http.post<Veterinario>(this.baseUrl+'/post', veterinario).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  read(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.baseUrl + '/all').pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Veterinario>{
    const url = `${this.baseUrl}/?id=${id}`
    return this.http.get<Veterinario>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  update(veterinario: Veterinario): Observable<Veterinario>{
    const url = `${this.baseUrl}/update/?id=${veterinario.id}`
    return this.http.patch<Veterinario>(url, veterinario).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Veterinario>{
    const url = `${this.baseUrl}/delete/?id=${id}`
    return this.http.delete<Veterinario>(url).pipe(
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

  errorHandler(e: any): Observable<any> {
    console.log(e);
    if (e.statusText == 'Unknown Error') {
      this.message.showMessage('Falha na conexão com a API.', true);
      this.spinner.hide()
      return EMPTY
    } else {
      this.message.showMessage(e.error.message, true);
      this.spinner.hide()
      return EMPTY
    }
  }

  getAuthToken() {
    const token = this.localStorage.get('token')
    return token;
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

  getAuthRole() {
    const role = this.localStorage.get('role')
    return role;
  }

}

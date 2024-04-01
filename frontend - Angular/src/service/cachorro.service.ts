import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Cachorro } from './../model/cachorro.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CachorroService {

  baseUrl = "http://localhost:3000/cachorros"

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private message: MessageService
  ) { }

  create(cachorro: Cachorro): Observable<Cachorro>{
    if (cachorro.racaId == null) {
      cachorro.racaId = 0
    }
    return this.http.post<Cachorro>(this.baseUrl+'/post', cachorro).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  read(): Observable<Cachorro[]> {
    return this.http.get<Cachorro[]>(this.baseUrl + '/all').pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Cachorro>{
    const url = `${this.baseUrl}/?id=${id}`
    return this.http.get<Cachorro>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  readByRaca(id: number): Observable<Cachorro[]> {
    const url = `${this.baseUrl}/raca/?id=${id}`
    return this.http.get<Cachorro[]>(url).pipe(
      map(obj => obj),
      catchError((e) => this.racaErrorHandler(e))
    )
  }

  update(cachorro: Cachorro): Observable<Cachorro>{
    const url = `${this.baseUrl}/update/?id=${cachorro.id}`
    if (cachorro.racaId == null) {
      cachorro.racaId = 0
    }
    return this.http.patch<Cachorro>(url, cachorro).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Cachorro>{
    const url = `${this.baseUrl}/delete/?id=${id}`
    return this.http.delete<Cachorro>(url).pipe(
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

  racaErrorHandler(e: any): Observable<any> {
    console.log(e);
    if (e.status == 'Unknown Error') {
      this.message.showMessage('Falha na conexão com a API.', true);
      this.spinner.hide()
      return EMPTY
    } if(e.status == 404) {
      this.spinner.hide()
      return EMPTY
    }
  }

}

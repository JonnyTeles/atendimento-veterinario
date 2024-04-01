import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Raca } from './../model/raca.model';
import { racaImage } from 'src/model/racaImage.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RacaService {
  baseUrl = 'http://localhost:3000/racas'

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private message: MessageService
  ) { }

  read(): Observable<Raca[]> {
    return this.http.get<Raca[]>(this.baseUrl + '/all').pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Raca> {
    const url = `${this.baseUrl}/id/${id}`
    return this.http.get<Raca>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  getRandomImage(): Observable<racaImage>{
    const url = 'https://api.thedogapi.com/v1/images/search/?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31'
    return this.http.get<Raca>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  getImage(id: number): Observable<racaImage> {
    const imageUrl = 'https://api.thedogapi.com/v1/images/search/?api_key=461e06fd-c361-4327-ba81-bee2f3a34c31&breed_id='
    const url = `${imageUrl}${id}`
    return this.http.get<Raca>(url).pipe(
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

}

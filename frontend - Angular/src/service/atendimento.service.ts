import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, catchError, map } from 'rxjs';
import { Atendimento } from 'src/model/atendimento.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  baseUrl = "http://localhost:3000/atendimentos"

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) { }

  create(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.baseUrl + '/post', atendimento).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  read(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(this.baseUrl + '/all').pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }
  
  readById(id: number): Observable<Atendimento>{
    const url = `${this.baseUrl}/?id=${id}`
    return this.http.get<Atendimento>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  update(atendimento: Atendimento): Observable<Atendimento>{
    const url = `${this.baseUrl}/update/?id=${atendimento.idAtendimento}`
    return this.http.patch<Atendimento>(url, atendimento).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Atendimento>{
    const url = `${this.baseUrl}/delete/?id=${id}`
    return this.http.delete<Atendimento>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    if (e.statusText == 'Unknown Error') {
      this.message.showMessage('Falha na conexão com a API.', true);
      return EMPTY
    } else {
      this.message.showMessage(e.error.message, true);
      return EMPTY
    }
  }
}

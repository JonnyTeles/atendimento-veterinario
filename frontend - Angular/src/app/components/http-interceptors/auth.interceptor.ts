import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientService } from 'src/service/client.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private clienteService: ClientService) { }


  intercept(req: HttpRequest<unknown>, next: HttpHandler) {

    const token = this.clienteService.getAuthToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request)
      .pipe(
        catchError((e) => this.clienteService.errorHandler(e)))
  }
}

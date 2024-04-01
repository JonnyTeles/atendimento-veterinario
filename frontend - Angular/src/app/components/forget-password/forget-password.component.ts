import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { MessageService } from 'src/service/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { HeaderService } from 'src/service/header.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../service/local-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  invalido: boolean
  public passwordForm: FormGroup

  constructor(
    private clienteService: ClientService,
    private message: MessageService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private component: AppComponent,
    private headerService: HeaderService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    headerService.headerData = {
      title: 'Redefinição de Senha',
      icon: 'lock',
      routeUrl: '/esqueceu-senha'
    }
   }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cpf: ['', Validators.required]
    })
  }
  public get email() {
    return this.passwordForm.get('email')
  }
  public get cpf() {
    return this.passwordForm.get('cpf')
  }

  sendEmail(): void {
    if(this.passwordForm.invalid){
      this.invalido = true
      this.spinner.hide()
      return
    }
    this.component.loadingText = 'Enviando código no email...'
    this.localStorage.set('email', this.email.value)
    this.localStorage.set('cpf', this.cpf.value)
    this.spinner.show()
    this.invalido = false
    this.clienteService.forgetPassword(this.passwordForm.value).subscribe(() => {
      this.spinner.hide()
      this.message.showMessage(`E-mail enviado.`)
      this.router.navigate(['/redefinir-senha'])
    })
  }

  cancel(): void {
    this.router.navigate(['/login'])
  }
}

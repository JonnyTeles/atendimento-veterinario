import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'src/service/client.service';
import { HeaderService } from 'src/service/header.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { MessageService } from 'src/service/message.service';
import { Cliente } from './../../../model/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private clienteService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private headerService: HeaderService,
    private localStorage: LocalStorageService,
    private message: MessageService
  ) { 
    headerService.headerData = {
      title: 'Login',
      icon: 'login',
      routeUrl: '/login'
    }
  }

  public cliente: Cliente = {} as Cliente
  invalido: boolean
  public id: string

  loginUsuario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  })
 
  public get email() {
    return this.loginUsuario.get('email')!;
  }

  public get senha() {
    return this.loginUsuario.get('senha')!;
  }
  
   loginUser(){
    if(this.loginUsuario.invalid){
      this.invalido = true
      return
    }
    this.cliente = {... this.loginUsuario.value} as Cliente;
    console.log(this.cliente);
    this.invalido = false
    this.spinner.show();
    this.clienteService.login(this.cliente).subscribe(
      (result) => {
        if(result && result.data.token){
          this.localStorage.set('token', result.data.token)
          this.localStorage.set('id', result.data.id)
          this.localStorage.set('role', result.data.role)
          this.localStorage.set('nome', result.data.nome)
          this.id = result.data.id
          console.log(this.id);
        }
         console.log(result);
         console.log(result.data);
        this.spinner.hide();
         this.message.showMessage(`Olá, ${result.data.nome}`)
        this.router.navigate([`/clients/profile/${this.id}`])
      }
    )
  }
  
  ngOnInit(): void {
  }
}

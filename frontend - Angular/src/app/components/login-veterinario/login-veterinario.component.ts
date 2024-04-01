import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/service/header.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { MessageService } from 'src/service/message.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { Veterinario } from './../../../model/veterinario.model';

@Component({
  selector: 'app-login-veterinario',
  templateUrl: './login-veterinario.component.html',
  styleUrls: ['./login-veterinario.component.css']
})
export class LoginVeterinarioComponent implements OnInit {

  constructor(
    private veterinarioService: VeterinarioService,
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
      routeUrl: '/login-vet'
    }
  }

  public veterinario: Veterinario = {} as Veterinario
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
    this.veterinario = {... this.loginUsuario.value} as Veterinario;
    this.spinner.show();
    this.veterinarioService.login(this.veterinario).subscribe(
      (result) => {
        if(result.data.role == 'Cliente'){
          this.spinner.hide()
          this.invalido = true
          this.message.showMessage('Veterinário inválido', true)
          return
        }
        if(result && result.data.token){
          this.localStorage.set('token', result.data.token)
          this.localStorage.set('id', result.data.id)
          this.localStorage.set('role', result.data.role)
          this.localStorage.set('nome', result.data.nome)
          this.id = result.data.id
        }
        this.invalido = false
        this.spinner.hide();
         this.message.showMessage(`Olá, ${result.data.nome}`)
        this.router.navigate([`/`])
      }
    )
  }

  ngOnInit(): void {
    this.localStorage.clear()
  }

}

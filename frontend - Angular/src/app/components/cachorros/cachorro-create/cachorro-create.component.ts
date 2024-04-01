import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cachorro } from 'src/model/cachorro.model';
import { CachorroService } from 'src/service/cachorro.service';
import { HeaderService } from './../../../../service/header.service';
import { Cliente } from 'src/model/client.model';
import { ClientService } from 'src/service/client.service';
import { Raca } from 'src/model/raca.model';
import { RacaService } from 'src/service/raca.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-cachorro-create',
  templateUrl: './cachorro-create.component.html',
  styleUrls: ['./cachorro-create.component.css']
})
export class CachorroCreateComponent implements OnInit {

  public cachorro: Cachorro = {} as Cachorro
  public cachorroForm: FormGroup
  raca: Raca[] = []
  cliente: Cliente[]
  invalido: boolean

  constructor(
    private cachorroService: CachorroService,
    private router: Router,
    private headerService: HeaderService,
    private clienteService: ClientService,
    private racaService: RacaService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private component: AppComponent,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Cadastro de Cachorros',
      icon: 'add',
      routeUrl: '/cachorros'
    }
  }

  ngOnInit(): void {
    this.clienteService.read().subscribe(clients => {
      this.cliente = clients
    })
    this.racaService.read().subscribe(racas => {
      this.raca = racas
    })
    this.cachorroForm = this.fb.group({
      nome: ['', Validators.required],
      racaId: [null, Validators.required],
      sexo: ['', Validators.required],
      cor: ['', Validators.required],
      idade: [null, Validators.required],
      peso: [null, Validators.required],
      clienteId: [null, Validators.required]
    })
  }

  public get nome() {
    return this.cachorroForm.get('nome')
  }
  public get racaId() {
    return this.cachorroForm.get('racaId')
  }
  public get sexo() {
    return this.cachorroForm.get('sexo')
  }
  public get cor() {
    return this.cachorroForm.get('cor')
  }
  public get idade() {
    return this.cachorroForm.get('idade')
  }
  public get peso() {
    return this.cachorroForm.get('peso')
  }
  public get clienteId() {
    return this.cachorroForm.get('clienteId')
  }

  createDog(): void {
    if (this.cachorroForm.invalid) {
      this.invalido = true
      return
    }
    this.component.loadingText = 'Cadastrando cachorro...'
    this.spinner.show()
    this.invalido = false
    this.cachorroService.create(this.cachorroForm.value).subscribe(() => {
      this.message.showMessage('Cachorro criado!')
      this.spinner.hide()
      this.router.navigate(['/cachorros'])
    })
  }

  cancel(): void {
    this.router.navigate(['/cachorros'])
  }
}

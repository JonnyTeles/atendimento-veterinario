import { Component, OnInit } from '@angular/core';
import { Cachorro } from 'src/model/cachorro.model';
import { Cliente } from 'src/model/client.model';
import { Atendimento } from '../../../../model/atendimento.model';
import { Veterinario } from 'src/model/veterinario.model';
import { AtendimentoService } from 'src/service/atendimento.service';
import { ClientService } from 'src/service/client.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { CachorroService } from 'src/service/cachorro.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-atendimento-create',
  templateUrl: './atendimento-create.component.html',
  styleUrls: ['./atendimento-create.component.css']
})
export class AtendimentoCreateComponent implements OnInit {

 
  public atendimento: Atendimento = {} as Atendimento
  public atendimentoForm: FormGroup
  cliente: Cliente[]
  cachorro: Cachorro[]
  veterinario: Veterinario[]
  invalido: boolean

  constructor(
    private atendimentoService: AtendimentoService,
    private clienteService: ClientService,
    private veterinarioService: VeterinarioService,
    private cachorroService: CachorroService,
    private router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Cadastro de Atendimentos',
      icon: 'add',
      routeUrl: '/atendimentos'
    }
  }

  ngOnInit(): void {
    this.clienteService.read().subscribe(clients => {
      this.cliente = clients
    })
    this.cachorroService.read().subscribe(cachorros => {
      this.cachorro = cachorros
    })
    this.veterinarioService.read().subscribe(veterianrios => {
      this.veterinario = veterianrios
    })
    this.atendimentoForm = this.fb.group({
      data: ['', Validators.required],
      clienteId: ['', Validators.required],
      cachorroId: ['', Validators.required],
      veterinarioId: ['', Validators.required],
      diagnostico: ['', Validators.required],
      comentarios: ['', Validators.required]
    })
  }
  public get data() {
    return this.atendimentoForm.get('data')
  }
  public get clienteId() {
    return this.atendimentoForm.get('clienteId')
  }
  public get cachorroId() {
    return this.atendimentoForm.get('cachorroId')
  }
  public get veterinarioId() {
    return this.atendimentoForm.get('veterinarioId')
  }
  public get diagnostico() {
    return this.atendimentoForm.get('diagnostico')
  }
  public get comentarios() {
    return this.atendimentoForm.get('comentarios')
  }

  createAtendimento(): void {
    if(this.atendimentoForm.invalid){
      this.invalido = true
      return
    }
    this.invalido = false
    this.atendimentoService.create(this.atendimentoForm.value).subscribe(() => {
      this.message.showMessage('Atendimento criado!')
      this.router.navigate(['/atendimentos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/atendimentos'])
  }

}

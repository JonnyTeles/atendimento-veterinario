import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/model/atendimento.model';
import { Cliente } from 'src/model/client.model';
import { Veterinario } from 'src/model/veterinario.model';
import { Cachorro } from './../../../../model/cachorro.model';
import { AtendimentoService } from 'src/service/atendimento.service';
import { ClientService } from 'src/service/client.service';
import { CachorroService } from 'src/service/cachorro.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-atendimento-update',
  templateUrl: './atendimento-update.component.html',
  styleUrls: ['./atendimento-update.component.css']
})
export class AtendimentoUpdateComponent implements OnInit {

  atendimento: Atendimento = {} as Atendimento
  public atendimentoForm: FormGroup
  cliente: Cliente[]
  cachorro: Cachorro[]
  veterinario: Veterinario[]
  invalido: boolean
  dataInvalida: boolean

  constructor(
    private atendimentoService: AtendimentoService,
    private clienteService: ClientService,
    private cachorroService: CachorroService,
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private message: MessageService
  ) { 
    headerService.headerData = {
      title: 'Edição de Atendimentos',
      icon: 'edit',
      routeUrl: '/atendimentos'
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idAtendimento')
    this.atendimentoService.readById(Number(id)).subscribe(atendimento => {
      this.atendimento = atendimento
      atendimento.clienteId = atendimento.cliente.id
      atendimento.cachorroId = atendimento.cachorro.id
      atendimento.veterinarioId = atendimento.veterinario.id   
  
      this.atendimentoForm = this.fb.group({
        idAtendimento: [atendimento.idAtendimento],
        data: ['Invalid Date', Validators.required],
        clienteId: [atendimento.clienteId, Validators.required],
        cachorroId: [atendimento.cachorroId, Validators.required],
        veterinarioId: [atendimento.veterinarioId, Validators.required],
        diagnostico: [atendimento.diagnostico, Validators.required],
        comentarios: [atendimento.comentarios, Validators.required]
      })
    })
    this.clienteService.read().subscribe(clientes => {
      this.cliente = clientes
    })
    this.cachorroService.read().subscribe(cachorros => {
      this.cachorro = cachorros
    })
    this.veterinarioService.read().subscribe(veterinarios => {
      this.veterinario = veterinarios
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
  
  updateAtendimento(): void {
    if(this.atendimentoForm.invalid){
      this.invalido = true
      this.dataInvalida = true
      return
    }
    console.log(this.atendimentoForm.value.data);
    if(this.atendimentoForm.value.data == 'Invalid Date') {
      this.message.showMessage(`Insira uma data válida`, true)
      this.dataInvalida = true
      this.invalido = true
      return
    }
    this.invalido = false
    this.dataInvalida = false
    this.atendimentoService.update(this.atendimentoForm.value).subscribe(() => {
      this.message.showMessage(`Atendimento com ID ${this.atendimento.idAtendimento} alterado com sucesso!`)
      this.router.navigate(['/atendimentos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/atendimentos'])
  }

}

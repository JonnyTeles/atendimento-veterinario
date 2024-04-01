import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/model/atendimento.model';
import { AtendimentoService } from 'src/service/atendimento.service';
import { HeaderService } from 'src/service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/model/client.model';
import { Cachorro } from 'src/model/cachorro.model';
import { Veterinario } from './../../../../model/veterinario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CachorroService } from 'src/service/cachorro.service';
import { ClientService } from 'src/service/client.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-atendimento-delete',
  templateUrl: './atendimento-delete.component.html',
  styleUrls: ['./atendimento-delete.component.css']
})
export class AtendimentoDeleteComponent implements OnInit {

  atendimento: Atendimento = {} as Atendimento
  cliente: Cliente[]
  cachorro: Cachorro[]
  veterinario: Veterinario[]
  public atendimentoForm: FormGroup

  constructor(
    private atendimentoService: AtendimentoService,
    private cachorroService: CachorroService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClientService,
    private veterinarioService: VeterinarioService,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Exclusão de Atendimentos',
      icon: 'delete',
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
        id: [{ value: atendimento.idAtendimento, disabled: true }],
        data: [{ value: atendimento.data, disabled: true }, Validators.required],
        cliente: [{ value: `${atendimento.clienteId} - ${atendimento.cliente.nome}`, disabled: true }, Validators.required],
        cachorro: [{ value: `${atendimento.cachorroId} - ${atendimento.cachorro.nome}`, disabled: true }, Validators.required],
        veterinario: [{ value: `${atendimento.veterinarioId} - ${atendimento.veterinario.nome}`, disabled: true }, Validators.required],
        diagnostico: [{ value: atendimento.diagnostico, disabled: true }, Validators.required],
        comentarios: [{ value: atendimento.comentarios, disabled: true }, Validators.required]
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

  deleteAtendimento(): void {
    this.message.openDialog(`Excluir atendimento`, `Deseja mesmo excluir este atendimento?`, 'Excluir')
    .afterClosed().subscribe(res => {
      if (res) {
        this.atendimentoService.delete(this.atendimento.idAtendimento).subscribe(() => {
          this.message.showMessage(`Atendimento excluído com sucesso!`)
          this.router.navigate(["/atendimentos"])
        })
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/atendimentos'])
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/model/client.model';
import { Cachorro } from 'src/model/cachorro.model';
import { HeaderService } from './../../../../service/header.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { AtendimentoService } from 'src/service/atendimento.service';
import { Atendimento } from 'src/model/atendimento.model';
import { MessageService } from 'src/service/message.service';
import { DialogComponent } from '../../views/dialog/dialog.component';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})

export class ClientProfileComponent implements OnInit {

  client: Cliente
  cachorro: Cachorro[]
  atendimento: Atendimento[]

  displayedColumns = ['nome', 'raca', 'cor', 'sexo', 'peso', 'idade']
  displayedColumnsAtendimento = ['idAtendimento', 'data', 'cliente', 'cachorro', 'veterinario', 'action'];

  constructor(
    private clientService: ClientService,
    private AtendimentoService: AtendimentoService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private localStorage: LocalStorageService,
    private message: MessageService) {
    headerService.headerData = {
      title: String(this.nome),
      icon: 'person',
      routeUrl: '/clients'
    }
  }

  public nome: String = this.localStorage.get('nome')
  public email: String
  public cpf: String
  public role: String = this.localStorage.get('role')

  public mostrarCachorrosString: String = 'Mostrar cachorros'
  public cachorrosTabela: boolean = false

  public mostrarAtendimentosString: String = 'Mostrar atendimentos'
  public atendimentosTabela: boolean = false

  logout() {
    this.message.openDialog('Fazer logout?', 'Deseja mesmo sair?', 'Sim').afterClosed().subscribe(res => {
      if (res) {
        this.message.showMessage('Deslogado')
        this.localStorage.clear()
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.clientService.readById(Number(id)).subscribe(client => {
      this.client = client
      this.cachorro = client.cachorros
      this.atendimento = client.atendimento
      this.email = client.email
      this.cpf = client.cpf
      console.log(client);
      console.log(this.atendimento);
      console.log(this.cachorro);
    })
  }

  mostrarCachorros() {
    if (this.cachorrosTabela == false) {
      this.cachorrosTabela = true
      this.mostrarCachorrosString = 'Esconder cachorros'
    } else {
      this.cachorrosTabela = false
      this.mostrarCachorrosString = 'Mostrar cachorros'
    }
  }

  mostrarAtendimentos() {
    if (this.atendimentosTabela == false) {
      this.atendimentosTabela = true
      this.mostrarAtendimentosString = 'Esconder atendimentos'
    } else {
      this.atendimentosTabela = false
      this.mostrarAtendimentosString = 'Mostrar atendimentos'
    }
  }

}
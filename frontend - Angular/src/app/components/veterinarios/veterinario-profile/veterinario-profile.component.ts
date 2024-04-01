import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Atendimento } from 'src/model/atendimento.model';
import { Veterinario } from 'src/model/veterinario.model';
import { HeaderService } from 'src/service/header.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { MessageService } from 'src/service/message.service';
import { VeterinarioService } from 'src/service/veterinario.service';

@Component({
  selector: 'app-veterinario-profile',
  templateUrl: './veterinario-profile.component.html',
  styleUrls: ['./veterinario-profile.component.css']
})
export class VeterinarioProfileComponent implements OnInit {

  veterinario: Veterinario
  atendimento: Atendimento[]

  displayedColumnsAtendimento = ['idAtendimento', 'data', 'cliente', 'cachorro', 'action'];

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private message: MessageService
  ) { 
    headerService.headerData = {
      title: `Dr. ${String(this.nome)}`,
      icon: 'person',
      routeUrl: '/clients'
    }
  }

  public nome = this.localStorage.get('nome')
  public email: string
  public cpf: string
  public especializacao: string
  public role = this.localStorage.get('role')
  public mostrar: string = 'Mostrar atendimentos'
  public tabela: boolean = false

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.veterinarioService.readById(Number(id)).subscribe(veterinario => {
      this.veterinario = veterinario
      this.atendimento = veterinario.Atendimento
      console.log(this.atendimento);
      this.email = veterinario.email
      this.cpf = veterinario.cpf
      this.especializacao = veterinario.especializacao
      console.log(veterinario);
    })
  }

  mostrarEsconder() {
    if(this.tabela == false){
      this.tabela = true
      this.mostrar = 'Esconder atendimentos'
    } else {
      this.tabela = false
      this.mostrar = 'Mostrar atendimentos'
    }
  }

  logout() {
    this.message.openDialog('Logout', 'Deseja mesmo sair?', 'Sim').afterClosed().subscribe(res => {
      if (res) {
        this.message.showMessage('Deslogado')
        this.localStorage.clear()
        this.router.navigate(['/'])
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { CachorroService } from 'src/service/cachorro.service';
import { HeaderService } from './../../../../service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cachorro } from 'src/model/cachorro.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from './../../../../service/client.service';
import { RacaService } from 'src/service/raca.service';
import { Cliente } from './../../../../model/client.model';
import { Raca } from 'src/model/raca.model';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-cachorro-delete',
  templateUrl: './cachorro-delete.component.html',
  styleUrls: ['./cachorro-delete.component.css']
})
export class CachorroDeleteComponent implements OnInit {

  cachorro: Cachorro = {} as Cachorro
  cliente: Cliente[]
  raca: Raca[]
  public cachorroForm: FormGroup


  constructor(
    private cachorroService: CachorroService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClientService,
    private racaService: RacaService,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Exclusão de Cachorros',
      icon: 'delete',
      routeUrl: '/cachorros'
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.cachorroService.readById(Number(id)).subscribe(cachorro => {
      this.cachorro = cachorro
      cachorro.clienteId = cachorro.tutor.id
      cachorro.racaId = cachorro.raca.id
      this.cachorroForm = this.fb.group({
        id: [{value: cachorro.id, disabled: true}],
        nome: [{value: cachorro.nome, disabled: true}, Validators.required],
        racaId: [{value: cachorro.raca.name, disabled: true}, Validators.required],
        clienteId: [{value: `${cachorro.tutor.id} - ${cachorro.tutor.nome}`, disabled: true}, Validators.required]
      })
    })
    this.clienteService.read().subscribe(clients => {
      this.cliente = clients
    })
    this.racaService.read().subscribe(racas => {
      this.raca = racas
    })
   
  }

  deleteCachorro(): void {
    this.message.openDialog(`Excluir cachorro`, `Deseja mesmo excluir o cachorro ${this.cachorro.nome}?`, 'Excluir')
      .afterClosed().subscribe(res => {
        if (res) {
          this.cachorroService.delete(this.cachorro.id).subscribe(() => {
            this.message.showMessage(`Cachorro ${this.cachorro.nome} excluído com sucesso!`)
            this.router.navigate(["/cachorros"])
          })
        }
      })
  }

  cancel(): void {
    this.router.navigate(['/cachorros'])
  }

}

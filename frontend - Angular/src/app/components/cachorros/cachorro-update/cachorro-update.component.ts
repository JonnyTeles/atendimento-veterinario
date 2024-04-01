import { Component, OnInit } from '@angular/core';
import { Cachorro } from 'src/model/cachorro.model';
import { CachorroService } from 'src/service/cachorro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from './../../../../service/header.service';
import { Raca } from 'src/model/raca.model';
import { Cliente } from 'src/model/client.model';
import { ClientService } from 'src/service/client.service';
import { RacaService } from 'src/service/raca.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-cachorro-update',
  templateUrl: './cachorro-update.component.html',
  styleUrls: ['./cachorro-update.component.css']
})
export class CachorroUpdateComponent implements OnInit {

  cachorro: Cachorro = {} as Cachorro
  public cachorroForm: FormGroup
  raca: Raca[]
  cliente: Cliente[]
  invalido: boolean


  constructor(
    private cachorroService: CachorroService,
    private clienteService: ClientService,
    private racaService: RacaService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private component: AppComponent,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Edição de Cachorros',
      icon: 'pets',
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
        id: [cachorro.id],
        nome: [cachorro.nome, Validators.required],
        racaId: [cachorro.racaId, Validators.required],
        sexo: [cachorro.sexo, Validators.required],
        cor: [cachorro.cor, Validators.required],
        idade: [cachorro.idade, Validators.required],
        peso: [cachorro.peso, Validators.required],
        clienteId: [cachorro.clienteId, Validators.required]
      })
    })
    this.clienteService.read().subscribe(clients => {
      this.cliente = clients
    })
    this.racaService.read().subscribe(racas => {
      this.raca = racas
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

  updateCachorro(): void {
    if (this.cachorroForm.invalid) {
      this.invalido = true
      return
    }
    this.component.loadingText = 'Atualizando cachorro...'
    this.spinner.show()
    this.invalido = false
    this.cachorroService.update(this.cachorroForm.value).subscribe(() => {
      this.message.showMessage(`Cachorro ${this.cachorro.nome} alterado com sucesso!`)
      this.spinner.hide()
      this.router.navigate(['/cachorros'])
    })
  }

  cancel(): void {
    this.router.navigate(['/cachorros'])
  }

}

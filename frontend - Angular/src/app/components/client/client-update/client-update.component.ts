import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/model/client.model';
import { HeaderService } from 'src/service/header.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  client: Cliente = {} as Cliente
  public clienteForm: FormGroup
  invalido: boolean

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private component: AppComponent,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Edição de Clientes',
      icon: 'manage_accounts',
      routeUrl: '/clients'
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.clientService.readById(Number(id)).subscribe(client => {
      this.client = client
      this.clienteForm = this.fb.group({
        id: [client.id],
        nome: [client.nome, Validators.required],
        email: [client.email, [Validators.required, Validators.email]],
        cpf: [client.cpf, Validators.required]
      })
    })
  }

  public get nome() {
    return this.clienteForm.get('nome')
  }
  public get email() {
    return this.clienteForm.get('email')
  }
  public get cpf() {
    return this.clienteForm.get('cpf')
  }

  updateClient(): void {
    if (this.clienteForm.invalid) {
      this.invalido = true
      return
    }
    this.component.loadingText = 'Atualizando cliente...'
    this.invalido = false
    this.spinner.show()
    this.clientService.update(this.clienteForm.value).subscribe(() => {
      this.message.showMessage(`Cliente ${this.client.nome} alterado com sucesso!`)
      this.spinner.hide()
      this.router.navigate(['/clients'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clients'])
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/model/client.model';
import { HeaderService } from 'src/service/header.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  cliente: Cliente = {} as Cliente

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Exclusão de Clientes',
      icon: 'delete',
      routeUrl: '/clients'
    }
  }

  clienteForm = this.fb.group({
    id: [{ value: null, disabled: true }, Validators.required],
    nome: [{ value: '', disabled: true }, Validators.required],
    email: [{ value: '', disabled: true }, Validators.required],
    cpf: [{ value: '', disabled: true }, Validators.required],
  })

  public get nome() {
    return this.clienteForm.get('nome')
  }
  public get email() {
    return this.clienteForm.get('email')
  }
  public get cpf() {
    return this.clienteForm.get('cpf')
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.clientService.readById(Number(id)).subscribe((client) => {
      this.cliente = client
    })
  }

  deleteClient(): void {
    this.message.openDialog(`Excluir cliente`, `Deseja mesmo excluir o cliente ${this.cliente.nome}?`, 'Excluir')
      .afterClosed().subscribe(res => {
        if (res) {
          this.clientService.delete(this.cliente.id).subscribe(() => {
            this.message.showMessage(`Cliente ${this.cliente.nome} excluído com sucesso!`)
            this.router.navigate(["/clients"])
          })
        }
      })
  }
  cancel(): void {
    this.router.navigate(['/clients'])
  }

}

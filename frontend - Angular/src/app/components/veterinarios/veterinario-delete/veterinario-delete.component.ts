import { Component, OnInit } from '@angular/core';
import { VeterinarioService } from 'src/service/veterinario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Veterinario } from 'src/model/veterinario.model';
import { HeaderService } from 'src/service/header.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-veterinario-delete',
  templateUrl: './veterinario-delete.component.html',
  styleUrls: ['./veterinario-delete.component.css']
})
export class VeterinarioDeleteComponent implements OnInit {
  
  veterinario: Veterinario = {} as Veterinario

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private message: MessageService
  ) { 
    headerService.headerData = {
      title: 'Exclusão de Veterinários',
      icon: 'delete',
      routeUrl: '/veterinarios'
    } 
  }

  veterinarioForm = this.fb.group({
    id: [{value: null, disabled: true}, Validators.required],
    nome: [{value: '', disabled: true}, Validators.required],
    email: [{value: '', disabled: true}, Validators.required],
    cpf: [{value: '', disabled: true}, Validators.required],
    especializacao: [{value: '', disabled: true}, Validators.required],
  })

  public get nome() {
    return this.veterinarioForm.get('nome')
  }
  public get email() {
    return this.veterinarioForm.get('email')
  }
  public get cpf() {
    return this.veterinarioForm.get('cpf')
  }
  public get especializacao() {
    return this.veterinarioForm.get('especializacao')
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.veterinarioService.readById(id).subscribe((veterinario) => {
      this.veterinario = veterinario
    })
  }

  deleteVeterinario(): void {
    this.message.openDialog(`Excluir veterinário`, `Deseja mesmo excluir o veterinário ${this.veterinario.nome}?`, 'Excluir')
    .afterClosed().subscribe(res => {
      if (res) {
        this.veterinarioService.delete(this.veterinario.id).subscribe(() => {
          this.message.showMessage(`Veterinário ${this.veterinario.nome} excluído com sucesso!`)
          this.router.navigate(["/veterinarios"])
        })
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/veterinarios'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Veterinario } from 'src/model/veterinario.model';
import { VeterinarioService } from 'src/service/veterinario.service';
import { HeaderService } from './../../../../service/header.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-vaterinario-update',
  templateUrl: './veterinario-update.component.html',
  styleUrls: ['./veterinario-update.component.css']
})
export class VeterinarioUpdateComponent implements OnInit {

  veterinario: Veterinario = {} as Veterinario
  public veterinarioForm: FormGroup
  invalido: boolean

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Edição de Veterinários',
      icon: 'manage_accounts',
      routeUrl: '/veterinarios'
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.veterinarioService.readById(Number(id)).subscribe(veterinario => {
      this.veterinario = veterinario
      this.veterinarioForm = this.fb.group({
        id: [veterinario.id],
        nome: [veterinario.nome, Validators.required],
        email: [veterinario.email, [Validators.required, Validators.email]],
        cpf: [veterinario.cpf, Validators.required],
        especializacao: [veterinario.especializacao, Validators.required]
      })
    })
  }

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


  updateVeterinario(): void {
    if(this.veterinarioForm.invalid){
      this.invalido = true
      return
    }
    this.invalido = false
    this.veterinarioService.update(this.veterinarioForm.value).subscribe(() => {
      this.message.showMessage(`Veterinário ${this.veterinario.nome} alterado com sucesso!`)
      this.router.navigate(['/veterinarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/veterinarios'])
  }

}

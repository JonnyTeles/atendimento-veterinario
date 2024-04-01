import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './../../../../service/client.service'
import { Cliente } from './../../../../model/client.model';
import { HeaderService } from './../../../../service/header.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  public cliente: Cliente = {} as Cliente
  public clienteForm: FormGroup
  invalido: boolean

  constructor(
    private clientService: ClientService,
    private message: MessageService,
    private router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private component: AppComponent
  ) {
    headerService.headerData = {
      title: 'Cadastro de Clientes',
      icon: 'person_add',
      routeUrl: '/clients'
    }
  }

  hide = true;

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      senha: ['', Validators.compose([Validators.required,
      Validators.minLength(6),
      this.patternValidator(new RegExp("(?=.*[0-9])"),
        { requiresDigit: true }),

      this.patternValidator(new RegExp("(?=.*[A-Z])"),
        { requiresUppercase: true }),

      this.patternValidator(new RegExp("(?=.*[a-z])"), {
        requiresLowercase: true
      }),

      this.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
        requiresSpecialChars: true
      })
      ])],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]]
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
  public get senha() {
    return this.clienteForm.get('senha')
  }
  public get confirmarSenha() {
    return this.clienteForm.get('confirmarSenha')
  }
  get requiredValid() {
    return !this.clienteForm.controls["senha"].hasError("required");
  }
  get minLengthValid() {
    return !this.clienteForm.controls["senha"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.clienteForm.controls["senha"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.clienteForm.controls["senha"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.clienteForm.controls["senha"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.clienteForm.controls["senha"].hasError("requiresSpecialChars");
  }

  createClient(): void {
    if (this.clienteForm.invalid) {
      this.invalido = true
      this.spinner.hide()
      return
    }
    this.component.loadingText = 'Cadastrando Cliente...'
    this.spinner.show()
    this.invalido = false
    this.clientService.create(this.clienteForm.value).subscribe(() => {
      this.spinner.hide()
      this.message.showMessage('Cliente criado!')
      this.router.navigate(['/clients'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clients'])
  }

  onPasswordChange() {
    if (this.confirmarSenha.value == this.senha.value) {
      this.confirmarSenha.setErrors(null);
    } else {
      this.confirmarSenha.setErrors({ mismatch: true });
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { Veterinario } from 'src/model/veterinario.model';
import { VeterinarioService } from 'src/service/veterinario.service';
import { Router } from '@angular/router';
import { HeaderService } from './../../../../service/header.service';
import { AbstractControl, FormBuilder, FormGroup, MaxLengthValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-veterinario-create',
  templateUrl: './veterinario-create.component.html',
  styleUrls: ['./veterinario-create.component.css']
})
export class VeterinarioCreateComponent implements OnInit {

  public veterianrio: Veterinario = {} as Veterinario
  public veterinarioForm: FormGroup
 
  constructor(
    private veterianrioService: VeterinarioService,
    private router: Router,
    private headerService: HeaderService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private component: AppComponent,
    private message: MessageService
  ) {
    headerService.headerData = {
      title: 'Cadastro de Veterinários',
      icon: 'person_add',
      routeUrl: '/veterinarios'
    }
  }

  invalido: boolean

  ngOnInit(): void {
    this.veterinarioForm = this.fb.group({
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
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
      especializacao: ['', Validators.required]
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
  public get senha() {
    return this.veterinarioForm.get('senha')
  }
  public get confirmarSenha() {
    return this.veterinarioForm.get('confirmarSenha')
  }
  public get especializacao() {
    return this.veterinarioForm.get('especializacao')
  }
  get requiredValid() {
    return !this.veterinarioForm.controls["senha"].hasError("required");
  }
  get minLengthValid() {
    return !this.veterinarioForm.controls["senha"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.veterinarioForm.controls["senha"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.veterinarioForm.controls["senha"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.veterinarioForm.controls["senha"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.veterinarioForm.controls["senha"].hasError("requiresSpecialChars");
  }

  createVeterinario(): void {
    if (this.veterinarioForm.invalid) {
      this.invalido = true
      return
    }
    this.invalido = false
    this.component.loadingText = 'Cadastrando Veterinário...'
    this.spinner.show()
    this.veterianrioService.create(this.veterinarioForm.value).subscribe(() => {
      this.spinner.hide()
      this.message.showMessage('Veterinário criado!')
      this.router.navigate(['/veterinarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/veterinarios'])
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

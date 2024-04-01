import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { ClientService } from "src/service/client.service";
import { MessageService } from "./../../../service/message.service";
import { Router } from "@angular/router";
import { HeaderService } from "src/service/header.service";
import { LocalStorageService } from "src/service/local-storage.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  invalido: boolean;
  public passwordForm: FormGroup;
  public hide: boolean = true;
  public botao: string = "Validar";
  public tokenForm: FormGroup;
  public reenviar: boolean = true;

  interval;
  time = 60;
  display;

  constructor(
    private clienteService: ClientService,
    private message: MessageService,
    private router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private component: AppComponent
  ) {
    headerService.headerData = {
      title: "Redefinição de Senha",
      icon: "lock",
      routeUrl: "/esqueceu-senha",
    };
  }

  ngOnInit(): void {
    this.tokenForm = this.fb.group({
      token: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
    });
    this.passwordForm = this.fb.group({
      senha: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          this.patternValidator(new RegExp("(?=.*[0-9])"), {
            requiresDigit: true,
          }),

          this.patternValidator(new RegExp("(?=.*[A-Z])"), {
            requiresUppercase: true,
          }),

          this.patternValidator(new RegExp("(?=.*[a-z])"), {
            requiresLowercase: true,
          }),

          this.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
            requiresSpecialChars: true,
          }),
        ]),
      ],
      confirmarSenha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  public get token() {
    return this.tokenForm.get("token");
  }
  public get senha() {
    return this.passwordForm.get("senha");
  }
  public get confirmarSenha() {
    return this.passwordForm.get("confirmarSenha");
  }
  get requiredValid() {
    return !this.passwordForm.controls["senha"].hasError("required");
  }
  get minLengthValid() {
    return !this.passwordForm.controls["senha"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.passwordForm.controls["senha"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.passwordForm.controls["senha"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.passwordForm.controls["senha"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.passwordForm.controls["senha"].hasError(
      "requiresSpecialChars"
    );
  }

  resetPassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    const form = {
      token: this.token.value,
      senha: this.senha.value,
    };
    this.spinner.show();
    this.component.loadingText = "Alterando senha...";
    this.spinner.hide();
    this.clienteService.resetPassword(form).subscribe(() => {
      this.localStorage.clear();
      this.message.showMessage("Senha alterada com sucesso");
      this.router.navigate(["/login"]);
    });
  }

  validarToken(): void {
    if (this.tokenForm.invalid) {
      this.spinner.hide();
      return;
    }
    this.clienteService.validToken(this.tokenForm.value).subscribe(() => {
      if (this.hide == true) {
        this.hide = false;
      }
    });
  }

  sendEmail(): void {
    const user = {
      email: this.localStorage.get("email"),
      cpf: this.localStorage.get("cpf"),
    };
    this.component.loadingText = "Enviando código no email...";
    this.spinner.show();
    this.clienteService.forgetPassword(user).subscribe(() => {
      this.spinner.hide();
      this.message.showMessage(`E-mail enviado.`);
    });
    return;
  }

  cancel(): void {
    this.router.navigate(["/login"]);
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

  startTimer() {
    this.interval = setInterval(() => {
      this.reenviar = false;
      if (this.time === 0) {
        this.time = 60;
        this.pauseTimer();
        this.reenviar = true;
      } else {
        this.time--;
      }
      this.display = this.time;

      return this.display;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  fetchDisplay() {
    return this.display;
  }
}

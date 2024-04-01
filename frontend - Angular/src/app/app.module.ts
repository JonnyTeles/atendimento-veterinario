import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/views/home/home.component';
import { ClientCrudComponent } from './components/views/client-crud/client-crud.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import { MatRadioModule } from '@angular/material/radio'
import { ClientReadComponent } from './components/client/client-read/client-read.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { VeterinarioCrudComponent } from './components/views/veterinario-crud/veterinario-crud.component';
import { VeterinarioReadComponent } from './components/veterinarios/veterinario-read/veterinario-read.component';
import { VeterinarioCreateComponent } from './components/veterinarios/veterinario-create/veterinario-create.component';
import { VeterinarioUpdateComponent } from './components/veterinarios/vaterinario-update/veterinario-update.component';
import { VeterinarioDeleteComponent } from './components/veterinarios/veterinario-delete/veterinario-delete.component';
import { CachorroCrudComponent } from './components/views/cachorro-crud/cachorro-crud.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { CachorroProfileComponent } from './components/cachorros/cachorro-profile/cachorro-profile.component';
import { CachorroCreateComponent } from './components/cachorros/cachorro-create/cachorro-create.component';
import { MatSelectModule } from '@angular/material/select';
import { CachorroDeleteComponent } from './components/cachorros/cachorro-delete/cachorro-delete.component';
import { CachorroUpdateComponent } from './components/cachorros/cachorro-update/cachorro-update.component';
import { AtendimentoCrudComponent } from './components/views/atendimento-crud/atendimento-crud.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AtendimentoCreateComponent } from './components/atendimento/atendimento-create/atendimento-create.component';
import { AtendimentoReadComponent } from './components/atendimento/atendimento-read/atendimento-read.component';
import { AtendimentoProfileComponent } from './components/atendimento/atendimento-profile/atendimento-profile.component';
import { AtendimentoDeleteComponent } from './components/atendimento/atendimento-delete/atendimento-delete.component';
import { AtendimentoUpdateComponent } from './components/atendimento/atendimento-update/atendimento-update.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RacaComponent } from './components/views/raca/raca.component';
import { RacaReadComponent } from './components/raca/raca-read/raca-read.component';
import { CachorroReadComponent } from './components/cachorros/cachorro-read/cachorro-read.component';
import { RacaProfileComponent } from './components/raca/raca-profile/raca-profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './components/login/login.component'
import { HttpInterceptorProviders } from './components/http-interceptors';
import { RotaProibidaComponent } from './components/rota-proibida/rota-proibida.component';
import { LoginVeterinarioComponent } from './components/login-veterinario/login-veterinario.component';
import { VeterinarioProfileComponent } from './components/veterinarios/veterinario-profile/veterinario-profile.component';
import { LocalziacaoComponent } from './localziacao/localziacao.component';
import { SobreComponent } from './sobre/sobre.component';
import { DialogComponent } from './components/views/dialog/dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ClientCrudComponent,
    ClientCreateComponent,
    ClientReadComponent,
    ClientUpdateComponent,
    ClientDeleteComponent,
    VeterinarioCrudComponent,
    VeterinarioReadComponent,
    VeterinarioCreateComponent,
    VeterinarioUpdateComponent,
    VeterinarioDeleteComponent,
    CachorroCrudComponent,
    ClientProfileComponent,
    CachorroProfileComponent,
    CachorroCreateComponent,
    CachorroDeleteComponent,
    CachorroUpdateComponent,
    AtendimentoCrudComponent,
    AtendimentoCreateComponent,
    AtendimentoReadComponent,
    AtendimentoProfileComponent,
    AtendimentoDeleteComponent,
    AtendimentoUpdateComponent,
    RacaComponent,
    RacaReadComponent,
    CachorroReadComponent,
    RacaProfileComponent,
    LoginComponent,
    RotaProibidaComponent,
    LoginVeterinarioComponent,
    VeterinarioProfileComponent,
    LocalziacaoComponent,
    SobreComponent,
    DialogComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    HttpInterceptorProviders,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    { provide: MatDialogRef, useValue: {} },
    {provide:MAT_DIALOG_DATA,useValue:{} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

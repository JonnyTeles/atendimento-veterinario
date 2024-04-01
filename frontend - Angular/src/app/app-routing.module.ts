import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ClientCrudComponent } from './components/views/client-crud/client-crud.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { VeterinarioCrudComponent } from './components/views/veterinario-crud/veterinario-crud.component';
import { VeterinarioCreateComponent } from './components/veterinarios/veterinario-create/veterinario-create.component';
import { VeterinarioUpdateComponent } from './components/veterinarios/vaterinario-update/veterinario-update.component';
import { VeterinarioDeleteComponent } from './components/veterinarios/veterinario-delete/veterinario-delete.component';
import { CachorroCrudComponent } from './components/views/cachorro-crud/cachorro-crud.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { CachorroProfileComponent } from './components/cachorros/cachorro-profile/cachorro-profile.component';
import { CachorroCreateComponent } from './components/cachorros/cachorro-create/cachorro-create.component';
import { CachorroDeleteComponent } from './components/cachorros/cachorro-delete/cachorro-delete.component';
import { CachorroUpdateComponent } from './components/cachorros/cachorro-update/cachorro-update.component';
import { AtendimentoCrudComponent } from './components/views/atendimento-crud/atendimento-crud.component';
import { AtendimentoCreateComponent } from './components/atendimento/atendimento-create/atendimento-create.component';
import { AtendimentoProfileComponent } from './components/atendimento/atendimento-profile/atendimento-profile.component';
import { AtendimentoDeleteComponent } from './components/atendimento/atendimento-delete/atendimento-delete.component';
import { AtendimentoUpdateComponent } from './components/atendimento/atendimento-update/atendimento-update.component';
import { RacaComponent } from './components/views/raca/raca.component';
import { RacaProfileComponent } from './components/raca/raca-profile/raca-profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/service/auth.guard';
import { RotaProibidaComponent } from './components/rota-proibida/rota-proibida.component';
import { LoginVeterinarioComponent } from './components/login-veterinario/login-veterinario.component';
import { VeterinarioProfileComponent } from './components/veterinarios/veterinario-profile/veterinario-profile.component';
import { AuthGuard2 } from 'src/service/auth.guard2';
import { LocalziacaoComponent } from './localziacao/localziacao.component';
import { SobreComponent } from './sobre/sobre.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "clients",
    component: ClientCrudComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "clients/create",
    component: ClientCreateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "clients/update/:id",
    component: ClientUpdateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "clients/delete/:id",
    component: ClientDeleteComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "clients/profile/:id",
    component: ClientProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "veterinarios",
    component: VeterinarioCrudComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "veterinarios/create",
    component: VeterinarioCreateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "veterinarios/update/:id",
    component: VeterinarioUpdateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "veterinarios/delete/:id",
    component: VeterinarioDeleteComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "veterinarios/profile/:id",
    component: VeterinarioProfileComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "cachorros",
    component: CachorroCrudComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "cachorros/profile/:id",
    component: CachorroProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cachorros/create",
    component: CachorroCreateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "cachorros/delete/:id",
    component: CachorroDeleteComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "cachorros/update/:id",
    component: CachorroUpdateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "atendimentos",
    component: AtendimentoCrudComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "atendimentos/create",
    component: AtendimentoCreateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "atendimentos/profile/:idAtendimento",
    component: AtendimentoProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "atendimentos/delete/:idAtendimento",
    component: AtendimentoDeleteComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "atendimentos/update/:idAtendimento",
    component: AtendimentoUpdateComponent,
    canActivate: [AuthGuard2]
  },
  {
    path:"racas",
    component: RacaComponent,
  },
  {
    path: "racas/profile/:id",
    component: RacaProfileComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "login-vet",
    component: LoginVeterinarioComponent
  },
  {
    path: "acesso-negado",
    component: RotaProibidaComponent
  },
  {
    path: "localizacao",
    component: LocalziacaoComponent
  },
  {
    path: "sobre",
    component: SobreComponent
  },
  {
    path: "esqueceu-senha",
    component: ForgetPasswordComponent
  },
  {
    path: "redefinir-senha",
    component: ResetPasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

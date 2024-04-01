import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/model/atendimento.model';
import { Cachorro } from 'src/model/cachorro.model';
import { Cliente } from 'src/model/client.model';
import { Raca } from 'src/model/raca.model';
import { AtendimentoService } from 'src/service/atendimento.service';
import { HeaderService } from 'src/service/header.service';
import { Veterinario } from './../../../../model/veterinario.model';
import { RacaService } from 'src/service/raca.service';
import { racaImage } from 'src/model/racaImage.model';

@Component({
  selector: 'app-atendimento-profile',
  templateUrl: './atendimento-profile.component.html',
  styleUrls: ['./atendimento-profile.component.css']
})
export class AtendimentoProfileComponent implements OnInit {

  atendimento: Atendimento
  cachorro: Cachorro
  cliente: Cliente
  raca: Raca
  veterinario: Veterinario
  racaImage: racaImage
  imagem

  constructor(
    private atendimentoService: AtendimentoService,
    private racaService: RacaService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Atendimentos',
      icon: 'calendar_month',
      routeUrl: '/atendimentos'
    }
  }

  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('idAtendimento')
    this.atendimentoService.readById(id).subscribe(atendimento => {
      this.atendimento = atendimento
      console.log(atendimento);
      this.racaService.getImage(this.atendimento.cachorro.raca.id).subscribe(racaImage => {
        this.imagem = racaImage[0].url
      })
    })
  }

 

}

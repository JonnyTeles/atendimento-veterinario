import { Component, OnInit } from '@angular/core';
import { CachorroService } from 'src/service/cachorro.service';
import { Cliente } from './../../../../model/client.model';
import { Cachorro } from 'src/model/cachorro.model';
import { Raca } from 'src/model/raca.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';
import { RacaService } from 'src/service/raca.service';

@Component({
  selector: 'app-cachorro-profile',
  templateUrl: './cachorro-profile.component.html',
  styleUrls: ['./cachorro-profile.component.css']
})
export class CachorroProfileComponent implements OnInit {

  client: Cliente[]
  cachorro: Cachorro
  raca: Raca

  constructor(
    private cachorroService: CachorroService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private racaService: RacaService
  ) {
    headerService.headerData = {
      title: 'Cachorros',
      icon: 'pets',
      routeUrl: '/cachorros'
    }
  }

  private racaId: number
  public nome: string
  public racaDog: string
  public sexo: string
  public idade: number
  public peso: number
  public cor: string
  public tutor: string
  public imagem: string


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.cachorroService.readById(Number(id)).subscribe(cachorro => {
      this.cachorro = cachorro
      this.nome = cachorro.nome
      this.racaDog = cachorro.raca.name
      this.sexo = cachorro.sexo
      this.idade = cachorro.idade
      this.peso = cachorro.peso
      this.cor = cachorro.cor
      this.tutor = cachorro.tutor.nome
      this.racaId = cachorro.raca.id
      console.log(cachorro);
      this.racaService.getImage(Number(this.racaId)).subscribe(image => {
        if (image[0] == null) {
          this.imagem = "../../../../assets/img/img-error.png"
        } else {
          this.imagem = image[0].url
        }
      })
    })
  }
}

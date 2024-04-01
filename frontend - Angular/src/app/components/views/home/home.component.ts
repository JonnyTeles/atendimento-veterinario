import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
  ) {
    headerService.headerData = {
      title: 'Início',
      icon: 'home',
      routeUrl: '/'
    }
  }

  public imagem: String = '../../../../assets/img-home/img6.png'
  private aleatorio: number = 0
  private aleatorio2: number = 0
  public localizacao: string = "../../../../assets/img-home/clinica1.jpg"
  public veterinario: string = "../../../../assets/img-home/vet1.png"
  private aleatorio3: number = 0

  ngOnInit(): void {
  }

  newImage() {
    if (this.aleatorio >= 8) {
      this.aleatorio = 0
    }
    this.aleatorio += 1
    switch (this.aleatorio) {
      case 1: this.imagem = '../../../../assets/img-home/img5.png'; break
      case 2: this.imagem = '../../../../assets/img-home/img4.png'; break
      case 3: this.imagem = '../../../../assets/img-home/img7.png'; break
      case 4: this.imagem = '../../../../assets/img-home/img8.png'; break
      case 5: this.imagem = '../../../../assets/img-home/img9.png'; break
      case 6: this.imagem = '../../../../assets/img-home/img10.png'; break
      case 7: this.imagem = '../../../../assets/img-home/img11.png'; break
      default: this.imagem = '../../../../assets/img-home/img6.png'
    }
  }

  newImage2(){
    if(this.aleatorio2 >= 2){
      this.aleatorio2 = 0
    }
    this.aleatorio2 += 1
   switch(this.aleatorio2){
    case 0: this.localizacao = "../../../../assets/img-home/clinica1.jpg"; break
    case 1:  this.localizacao = "../../../../assets/img-home/clinica2.jpg"; break
    default:  this.localizacao = "../../../../assets/img-home/clinica1.jpg"
   }
  }

  newImage3(){
    if(this.aleatorio3 >= 3){
      this.aleatorio3 = 0
    }
    this.aleatorio3 += 1
   switch(this.aleatorio3){
    case 0: this.veterinario = "../../../../assets/img-home/vet1.jpg"; break
    case 1:  this.veterinario = "../../../../assets/img-home/vet2.jpg"; break
    case 2:  this.veterinario = "../../../../assets/img-home/vet3.jpg"; break
    default:  this.veterinario = "../../../../assets/img-home/vet1.png"
   }
  }
}

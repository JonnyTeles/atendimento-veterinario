import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-localziacao',
  templateUrl: './localziacao.component.html',
  styleUrls: ['./localziacao.component.css']
})
export class LocalziacaoComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Localização',
      icon: 'pin_drop',
      routeUrl: '/localizacao'
    }
   }

  ngOnInit(): void {
  }

}

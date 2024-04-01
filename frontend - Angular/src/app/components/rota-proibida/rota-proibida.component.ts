import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-rota-proibida',
  templateUrl: './rota-proibida.component.html',
  styleUrls: ['./rota-proibida.component.css']
})
export class RotaProibidaComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { 
    headerService.headerData = {
      title: 'Acesso Negado',
      icon: 'error',
      routeUrl: '/'
    }
  }

  ngOnInit(): void {
  }

}

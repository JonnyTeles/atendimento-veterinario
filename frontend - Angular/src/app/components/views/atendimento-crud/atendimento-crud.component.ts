import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-atendimento-crud',
  templateUrl: './atendimento-crud.component.html',
  styleUrls: ['./atendimento-crud.component.css']
})
export class AtendimentoCrudComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private router: Router
  ) {
    headerService.headerData = {
      title: 'Atendimentos',
      icon: 'calendar_month',
      routeUrl: '/atendimentos'
    }
   }

  ngOnInit(): void {
  }

  navigateToAtendimentoCreate(): void{
    this.router.navigate(['/atendimentos/create'])
  }
}

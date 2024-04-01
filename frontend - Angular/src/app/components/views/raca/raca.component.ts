import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-raca',
  templateUrl: './raca.component.html',
  styleUrls: ['./raca.component.css']
})
export class RacaComponent implements OnInit {

  constructor(private headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Raças',
      icon: 'pets',
      routeUrl: '/racas'
    }
  }
  

  ngOnInit(): void {
  }

}

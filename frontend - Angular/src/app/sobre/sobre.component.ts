import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: ' Sobre',
      icon: 'help',
      routeUrl: '/sobre'
    }
   }

  ngOnInit(): void {
  }

}

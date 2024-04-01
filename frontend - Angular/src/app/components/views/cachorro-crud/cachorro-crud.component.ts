import { Component, OnInit } from '@angular/core';
import { CachorroService } from 'src/service/cachorro.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-cachorro-crud',
  templateUrl: './cachorro-crud.component.html',
  styleUrls: ['./cachorro-crud.component.css']
})
export class CachorroCrudComponent implements OnInit {

  constructor(
    private cachorroService: CachorroService,
    private router: Router,
    private headerService: HeaderService
  ) { 
    headerService.headerData = {
      title: 'Cachorros',
      icon: 'pets',
      routeUrl: '/cachorros'
    } 
  }

  ngOnInit(): void {
  }

  navigateCachorroCreate(): void {
    this.router.navigate(['/cachorros/create'])
  }

}

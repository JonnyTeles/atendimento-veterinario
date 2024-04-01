import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/service/header.service';

@Component({
  selector: 'app-veterinario-crud',
  templateUrl: './veterinario-crud.component.html',
  styleUrls: ['./veterinario-crud.component.css']
})
export class VeterinarioCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) { 
    headerService.headerData = {
      title: 'Veterinários',
      icon: 'manage_accounts',
      routeUrl: '/veterinarios'
    } 
  }

  ngOnInit(): void {
  }

  navigateToVeterianrioCreate(): void {
    this.router.navigate(['/veterinarios/create'])

  }
}

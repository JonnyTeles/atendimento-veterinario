import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { HeaderService } from './../../../../service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    public clienteService: ClientService,
    public veterinarioService: VeterinarioService,
  ) { }

  ngOnInit(): void {
  }

  get title(): string {
    return this.headerService.headerData.title
  }

  get icon(): string {
    return this.headerService.headerData.icon
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }
}

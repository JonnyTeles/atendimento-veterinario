import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { VeterinarioService } from 'src/service/veterinario.service';
import { LoginComponent } from '../../login/login.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public clienteService: ClientService,
    public veterinarioService: VeterinarioService,
    public localStorage: LocalStorageService,
  ) { }
    
  ngOnInit(): void {
  }

}

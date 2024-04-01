import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RacaService } from 'src/service/raca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/service/header.service';
import { Raca } from 'src/model/raca.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cachorro } from 'src/model/cachorro.model';
import { CachorroService } from './../../../../service/cachorro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-raca-profile',
  templateUrl: './raca-profile.component.html',
  styleUrls: ['./raca-profile.component.css']
})
export class RacaProfileComponent implements AfterViewInit {

  raca: Raca
  imagem: string
  cachorros: Cachorro[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cachorro>;
  dataSource = new MatTableDataSource(this.cachorros);

  displayedColumns = ['id', 'nome', 'sexo', 'peso', 'idade', 'tutor', 'action'];

  constructor(
    private racaService: RacaService,
    private cachorroService: CachorroService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private spinner: NgxSpinnerService,
    private component: AppComponent

  ) {
    headerService.headerData = {
      title: 'Raças',
      icon: 'pets',
      routeUrl: '/racas'
    }
  }
  vazio: boolean

  ngOnInit(): void {
    this.spinner.show()
    const id = +this.route.snapshot.paramMap.get('id')
    this.racaService.readById(id).subscribe(raca => {
      this.raca = raca
      this.component.loadingText = `Carregando Dados da Raça ${this.raca.name}`
      this.headerService.headerData.title = raca.name
      this.racaService.getImage(id).subscribe(racaImage => {
        if (racaImage[0] == null) {
          this.imagem = "../../../../assets/img/img-error.png"
        } else {
          this.imagem = racaImage[0].url
        }
      })
      this.spinner.hide()
    })
  }

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.cachorroService.readByRaca(id).subscribe(response => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data = response
      if (this.dataSource.data.length == 0) {
        this.vazio = true
      } else {
        this.vazio = false
      }
    })
  }

  search($event: any) {
    const filterValue = ($event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Raca } from 'src/model/raca.model';
import { RacaService } from './../../../../service/raca.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService } from 'src/service/local-storage.service';


@Component({
  selector: 'app-raca-read',
  templateUrl: './raca-read.component.html',
  styleUrls: ['./raca-read.component.css']
})
export class RacaReadComponent implements AfterViewInit {
  racas: Raca[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Raca>;
  dataSource = new MatTableDataSource(this.racas);


  displayedColumns = ['id', 'name'];

  constructor(
    private racaService: RacaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private component: AppComponent,
  ) {
    this.component.loadingText = 'Carregando Raças...'
   }

  ngAfterViewInit(): void {
    this.spinner.show()
    this.racaService.read().subscribe(response => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data = response
      this.spinner.hide()
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

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AtendimentoReadDataSource } from './atendimento-read-datasource';
import { Atendimento } from 'src/model/atendimento.model';
import { AtendimentoService } from 'src/service/atendimento.service';

@Component({
  selector: 'app-atendimento-read',
  templateUrl: './atendimento-read.component.html',
  styleUrls: ['./atendimento-read.component.css']
})
export class AtendimentoReadComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Atendimento>;
  dataSource: AtendimentoReadDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idAtendimento', 'data', 'cliente', 'cachorro', 'veterinario', 'action'];

  constructor(private atendimentoService: AtendimentoService) {
    this.dataSource = new AtendimentoReadDataSource();
  }

  ngAfterViewInit(): void {
    this.atendimentoService.read().subscribe(response => {
      console.log(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data = response
    })
  }
}

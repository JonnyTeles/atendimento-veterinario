import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ClientRead2DataSource } from './client-read-datasource';
import { ClientService } from 'src/service/client.service';
import { Cliente } from 'src/model/client.model';

@Component({
  selector: 'app-client-read2',
  templateUrl: './client-read.component.html',
  styleUrls: ['./client-read.component.css']
})
export class ClientReadComponent implements AfterViewInit {

  clientes: Cliente[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cliente>;
  dataSource = new MatTableDataSource(this.clientes)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'email', 'cpf', 'action'];

  constructor(private clienteService: ClientService) {
    
  }

  ngAfterViewInit(): void {

    this.clienteService.read().subscribe(response => {
      console.log(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data = response
    })
  }


  search($event: any) {
   const filterValue = ($event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

}

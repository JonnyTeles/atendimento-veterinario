import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Veterinario } from 'src/model/veterinario.model';
import { VeterinarioService } from 'src/service/veterinario.service';

@Component({
  selector: 'app-vaterinario-read',
  templateUrl: './veterinario-read.component.html',
  styleUrls: ['./veterinario-read.component.css']
})
export class VeterinarioReadComponent implements AfterViewInit {

  veterinarios: Veterinario[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Veterinario>;
  dataSource = new MatTableDataSource(this.veterinarios);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'email', 'cpf', 'action'];

  constructor(private veterinarioService: VeterinarioService) {
  }

  ngAfterViewInit(): void {

    this.veterinarioService.read().subscribe(response => {
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


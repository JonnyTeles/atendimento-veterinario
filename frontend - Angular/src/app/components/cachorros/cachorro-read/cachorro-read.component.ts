import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Cachorro } from 'src/model/cachorro.model';
import { CachorroService } from 'src/service/cachorro.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cachorro-read',
  templateUrl: './cachorro-read.component.html',
  styleUrls: ['./cachorro-read.component.css']
})
export class CachorroReadComponent implements AfterViewInit {


  cachorros: Cachorro[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cachorro>;
  dataSource = new MatTableDataSource(this.cachorros);

  displayedColumns = ['id', 'nome', 'raca', 'sexo', 'peso', 'idade', 'tutor', 'action'];

  constructor(private cachorroService: CachorroService, private router: Router) {

  }

  ngAfterViewInit(): void {

    this.cachorroService.read().subscribe(response => {
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

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableDataSource } from './data-table-datasource';
import { Product, keyOfProducts } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns = keyOfProducts;

  constructor(private productService: ProductService) {
    this.dataSource = new DataTableDataSource();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource.setData(products);
      this.table.dataSource = this.dataSource; // Update table reference after setting the data source
    })
  }
}

import { Component, OnInit } from '@angular/core'

import { Product } from '../../model/product'
import { ProductService } from '../../service/product.service'

@Component({
  templateUrl: './table-dynamic.component.html',
})
export class TableDynamiComponent implements OnInit {
  products: Product[]

  cols: any[]

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((data) => (this.products = data))

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ]
  }
}

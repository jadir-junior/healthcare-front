import { Component, OnInit } from '@angular/core'

import { Product } from '../../model/product'
import { ProductService } from '../../service/product.service'

@Component({
  templateUrl: './table-basic.component.html',
})
export class TableBasicComponent implements OnInit {
  products: Product[]

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((data) => (this.products = data))
  }
}

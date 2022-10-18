export class PageScrollComponent implements OnInit {
  products: IProduct[] = []
  cols: IColumn[] = [
    { header: 'ID', field: 'id' },
    { header: 'Code', field: 'code' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'Price', field: 'price' },
    { header: 'Category', field: 'category' },
    { header: 'Quantity', field: 'quantity' },
    { header: 'Inventory Status', field: 'inventoryStatus' },
    { header: 'Rating', field: 'rating' },
  ]

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productsService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
    })
  }
}

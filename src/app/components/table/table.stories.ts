import { Meta, Story, moduleMetadata } from '@storybook/angular'

import { TableComponent } from './table.component'
import { TableModule } from './table.module'
import { TemplateModule } from '../../directives/template/template.module'

const controlsDisable = {
  bodyTemplate: {
    table: {
      disable: true,
    },
  },
  captionTemplate: {
    table: {
      disable: true,
    },
  },
  data: {
    table: {
      disable: true,
    },
  },
  expandedRowTemplate: {
    table: {
      disable: true,
    },
  },
  headerTemplate: {
    table: {
      disable: true,
    },
  },
  optionsHeaderTemplate: {
    table: {
      disable: true,
    },
  },
  paginator: {
    table: {
      disable: true,
    },
  },
  summaryTemplate: {
    table: {
      disable: true,
    },
  },
  tableService: {
    table: {
      disable: true,
    },
  },
  columns: {
    table: {
      disable: true,
    },
  },
  gridlines: {
    table: {
      disable: true,
    },
  },
  responsive: {
    table: {
      disable: true,
    },
  },
  responsiveLayout: {
    table: {
      disable: true,
    },
  },
  scrollable: {
    table: {
      disable: true,
    },
  },
  scrollDirection: {
    table: {
      disable: true,
    },
  },
  scrollHeight: {
    table: {
      disable: true,
    },
  },
  style: {
    table: {
      disable: true,
    },
  },
  value: {
    table: {
      disable: true,
    },
  },
  ngAfterContentInit: {
    table: {
      disable: true,
    },
  },
  ngOnChanges: {
    table: {
      disable: true,
    },
  },
  tableViewChild: {
    table: {
      disable: true,
    },
  },
  templates: {
    table: {
      disable: true,
    },
  },
}

export default {
  component: TableComponent,
  title: 'Data/Table',
  excludeStories: /.*Data$/,
  parameters: {},
  decorators: [
    moduleMetadata({
      imports: [TableModule, TemplateModule],
    }),
  ],
} as Meta

const Template: Story = (args) => ({
  props: args,
  template: `
    <hc-table [value]="products" [responsive]="true">
      <ng-template hcTemplate="header">
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body" let-product>
        <tr>
          <td>{{product.code}}</td>
          <td>{{product.name}}</td>
          <td>{{product.category}}</td>
          <td>{{product.quantity}}</td>
        </tr>
      </ng-template>
    </hc-table>
  `,
})

export const Basic = Template.bind({})
Basic.args = {
  products: [
    {
      'id': '1003',
      'code': '244wgerg2',
      'name': 'Blue T-Shirt',
      'description': 'Product Description',
      'image': 'blue-t-shirt.jpg',
      'price': 29,
      'category': 'Clothing',
      'quantity': 25,
      'inventoryStatus': 'INSTOCK',
      'rating': 5,
    },
    {
      'id': '1008',
      'code': 'vbb124btr',
      'name': 'Game Controller',
      'description': 'Product Description',
      'image': 'game-controller.jpg',
      'price': 99,
      'category': 'Electronics',
      'quantity': 2,
      'inventoryStatus': 'LOWSTOCK',
      'rating': 4,
    },
    {
      'id': '1009',
      'code': 'cm230f032',
      'name': 'Gaming Set',
      'description': 'Product Description',
      'image': 'gaming-set.jpg',
      'price': 299,
      'category': 'Electronics',
      'quantity': 63,
      'inventoryStatus': 'INSTOCK',
      'rating': 3,
    },
    {
      'id': '1001',
      'code': 'nvklal433',
      'name': 'Black Watch',
      'description': 'Product Description',
      'image': 'black-watch.jpg',
      'price': 72,
      'category': 'Accessories',
      'quantity': 61,
      'inventoryStatus': 'INSTOCK',
      'rating': 4,
    },
    {
      'id': '1007',
      'code': 'mbvjkgip5',
      'name': 'Galaxy Earrings',
      'description': 'Product Description',
      'image': 'galaxy-earrings.jpg',
      'price': 34,
      'category': 'Accessories',
      'quantity': 23,
      'inventoryStatus': 'INSTOCK',
      'rating': 5,
    },
  ],
}
Basic.argTypes = {
  ...controlsDisable,
}

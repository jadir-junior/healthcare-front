import { IHcDtOptions, TableComponent } from './table.component'
import { render, screen } from '@testing-library/angular'

import { IPagination } from 'src/app/models/pagination.model'
import { IPatient } from 'src/app/modules/patients/patients.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TableBaseService } from './table-base.service'
import userEvent from '@testing-library/user-event'

const ITEMS: IPatient[] = [
  {
    'id': 'c5090777-379d-418f-a479-a063ce3395e5',
    'name': 'Leslie Alexander',
    'email': 'leslie.alexander@email.com',
    'age': 39,
    'address': '8080 Railroad St.',
    'phone': '11999609711',
    'status': 'Approved ',
  },
  {
    'id': '6248b796-bf2e-4209-859a-feedd7d76d12',
    'name': 'Ronald Richards',
    'email': 'ronald.richards@email.com',
    'age': 53,
    'address': '3890 Poplar Dr.',
    'phone': '11999609712',
    'status': 'Pending',
  },
  {
    'id': '42c8fadf-27e5-42cf-bfc2-37e2d9a058ff',
    'name': 'Jane Cooper',
    'email': 'jane.cooper@email.com',
    'age': 42,
    'address': '2235 Avondale Ave.',
    'phone': '11999709713',
    'status': 'Approved',
  },
  {
    'id': '100cdab6-fe98-4f2d-aa0c-e26753ca5d34',
    'name': 'Robert Fox',
    'email': 'robert.fox@email.com',
    'age': 44,
    'address': '5798 Lakeview St.',
    'phone': '11999709714',
    'status': 'Approved',
  },
  {
    'id': '42a1c9aa-6796-43be-82e3-ecc478dc3304',
    'name': 'Jenny Wilson',
    'email': 'jenny.wilson@email.com',
    'age': 25,
    'address': '5798 Lakeview St.',
    'phone': '11999709715',
    'status': 'Approved',
  },
]

const RESPONSE: IPagination<IPatient> = {
  'items': ITEMS,
  'meta': {
    'totalItems': 7,
    'itemCount': 5,
    'itemsPerPage': 5,
    'totalPages': 2,
    'currentPage': 1,
  },
}

const DTOPTIONS: IHcDtOptions = {
  columns: [
    {
      title: 'Name',
      data: 'name',
    },
    {
      title: 'Email',
      data: 'email',
    },
    {
      title: 'Age',
      data: 'age',
    },
    {
      title: 'Adress',
      data: 'address',
    },
    {
      title: 'Phone',
      data: 'phone',
    },
    {
      title: 'Status',
      data: 'status',
    },
  ],
}

describe('TableComponent', () => {
  const setup = async () => {
    return render(TableComponent, {
      schemas: [NO_ERRORS_SCHEMA],
      providers: [TableBaseService],
      componentProperties: {
        items: RESPONSE.items,
        hcDtOptions: DTOPTIONS,
        checkbox: true,
      },
    })
  }

  it('should create a component', async () => {
    const { container } = await setup()

    expect(screen.getAllByTestId('row-patient').length).toBe(5)
    expect(container).toBeInTheDocument()
  })

  it.skip('should select one row', async () => {
    const { fixture } = await setup()
    const component = fixture.componentInstance
    const checkbox = screen.getByLabelText(
      'checkbox-c5090777-379d-418f-a479-a063ce3395e5'
    )

    userEvent.click(checkbox)

    console.log(component.tableBaseService.selecteds)
    expect(component.tableBaseService.selecteds).toEqual([
      {
        'id': 'c5090777-379d-418f-a479-a063ce3395e5',
        'name': 'Leslie Alexander',
        'email': 'leslie.alexander@email.com',
        'age': 39,
        'address': '8080 Railroad St.',
        'phone': '11999609711',
        'status': 'Approved ',
      },
    ])
  })

  it('should select all rows', async () => {
    await setup()
    const logSpy = jest.spyOn(console, 'log')
    const checkAll = screen.getByLabelText('checkboxAll')
    const submit = screen.getByLabelText('submit')

    userEvent.click(checkAll)
    userEvent.click(submit)

    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith(ITEMS)
  })
})

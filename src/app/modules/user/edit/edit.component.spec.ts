import { EditComponent } from './edit.component'
import { EditUserAccountComponent } from '../components/edit-user-account/edit-user-account.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { render } from '@testing-library/angular'

describe('EditComponent', () => {
  const setup = async () => {
    return render(EditComponent, {
      declarations: [EditUserAccountComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    })
  }

  it('create page edit', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})

import { ButtonModule } from './../../../../components/button/button.module'
import { CardModule } from '../../../../components/card/card.module'
import { EditUserAccountComponent } from './edit-user-account.component'
import { InputModule } from '../../../../components/input/input.module'
import { ReactiveFormsModule } from '@angular/forms'
import { SelectModule } from '../../../../components/select/select.module'
import { render } from '@testing-library/angular'

describe('EditUserAccountComponent', () => {
  const setup = async () => {
    return render(EditUserAccountComponent, {
      imports: [ReactiveFormsModule, CardModule, InputModule, SelectModule, ButtonModule],
    })
  }

  it('create form edit user', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})

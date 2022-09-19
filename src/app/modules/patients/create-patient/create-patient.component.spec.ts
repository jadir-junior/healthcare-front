import { CreatePatientComponent } from './create-patient.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { InputModule } from 'src/app/components/input/input.module'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { render } from '@testing-library/angular'

describe('CreatePatientComponent', () => {
  const setup = async () => {
    return render(CreatePatientComponent, {
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, HttpClientTestingModule, InputModule],
    })
  }

  it('should create a form create patient', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}
}

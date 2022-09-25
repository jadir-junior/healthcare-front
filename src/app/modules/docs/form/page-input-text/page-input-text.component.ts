import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-page-input-text',
  template: `
    <div class="wrapper-container-docs">
      <div style="margin-bottom: 1rem">
        <h2>Input</h2>
        <p class="body1">Input renders a text field to enter data</p>
      </div>
      <hc-card>
        <form [formGroup]="form" (submit)="onSubmit(form)">
          <div class="input-width">
            <h4>Basic</h4>
            <hc-input formControlName="basic"></hc-input>
          </div>

          <div class="input-width">
            <h4>Right Icon</h4>
            <hc-input formControlName="rightIcon" appendIcon="visibility"></hc-input>
          </div>

          <div class="input-width">
            <h4>Placeholder</h4>
            <hc-input formControlName="placeholder" placeholder="Placeholder"></hc-input>
          </div>

          <div class="input-width">
            <h4>Invalid</h4>
            <hc-input formControlName="username"></hc-input>
          </div>

          <div class="input-width">
            <h4>Disabled</h4>
            <hc-input formControlName="disabled"></hc-input>
          </div>
        </form>
      </hc-card>
    </div>
  `,
  styles: [
    `
      .input-width {
        width: 300px;

        h4 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class PageInputTextComponent implements OnInit {
  form: FormGroup = this.fb.group({
    basic: [''],
    rightIcon: [''],
    placeholder: [''],
    username: ['', [Validators.required]],
    disabled: [{ value: '', disabled: true }],
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls['username'].markAsTouched()
  }

  onSubmit({ value }: FormGroup) {
    console.log(value)
  }

  onClear() {
    this.form.reset()
  }
}

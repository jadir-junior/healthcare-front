import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { UserService } from './../services/user.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    lastVisit: [{ value: '', disabled: true }],
    status: ['', [Validators.required]],
  })
  genders = [
    { code: 'FEMALE', description: 'Female' },
    { code: 'MALE', description: 'Male' },
  ]
  status = [
    { code: 'APPROVED', description: 'Approved ' },
    { code: 'PENDING', description: 'Pending' },
  ]
  submitted = false

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      console.log(user)
      this.form.patchValue({
        name: user.name,
        age: user.age,
        gender: this.genders.find((g) => g.code === user.gender),
        phone: user.contact.phone,
        lastVisit: user.history[user.history.length - 1].lastVisit,
        status: this.status.find((f) => f.code === user.status),
      })
    })
  }

  onSubmit({ value }: FormGroup): void {
    this.submitted = true
    console.log(value)
  }
}

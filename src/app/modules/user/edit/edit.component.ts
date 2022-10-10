import { Component, OnInit } from '@angular/core'
import { IProfile, UserService } from './../services/user.service'

@Component({
  selector: 'app-edit',
  template: `
    <div class="hc-edit-container">
      <h2 style="margin-bottom: 1.5rem">Edit account</h2>
      <div class="hc-edit-wrapper-cards">
        <hc-edit-user-account
          *ngIf="user"
          [user]="user"
          (onEditUser)="onEditUser($event)"
        ></hc-edit-user-account>
      </div>
    </div>
  `,
  styles: [
    `
      .hc-edit-container {
        padding: 2rem;
      }

      .hc-edit-wrapper-cards {
        display: grid;
        grid-template-columns: 635px 1fr;
        gap: 2rem;
      }

      .hc-form-control {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class EditComponent implements OnInit {
  user!: IProfile

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user
    })
  }

  onEditUser(user: IProfile): void {
    console.log(user)
  }
}

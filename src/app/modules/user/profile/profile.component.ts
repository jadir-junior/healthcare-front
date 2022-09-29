import { Component, OnInit } from '@angular/core'

import { IProfile } from './../services/user.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: IProfile

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    this.userService.getProfile().subscribe((profile) => {
      this.profile = profile
    })
  }
}

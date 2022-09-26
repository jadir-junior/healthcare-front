import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Subscription, debounceTime } from 'rxjs'

import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-search',
  template: `
    <form
      class="wrapper-input"
      data-testid="search"
      [ngClass]="classes"
      [ngStyle]="style"
      [formGroup]="form"
    >
      <span class="material-symbols-outlined append-icon hc-search-icon"> search </span>
      <input
        type="text"
        formControlName="search"
        role="search"
        [attr.placeholder]="placeholder"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
    </form>
  `,
  styles: [
    `
      .wrapper-input {
        display: flex;
        border: 1px solid var(--neutral-background);
        border-radius: 2rem;
        background-color: var(--neutral-white);
        width: 100%;
        padding: 0.8rem 1rem;
      }

      .hc-search-icon {
        color: var(--neutral-gray-light);
        margin-right: 0.5rem;
      }

      .hc-search-focus {
        border: 1px solid var(--primary-default);
      }

      input {
        width: 100%;
        border: none;
        font-size: 1rem;
        color: var(--neutral-black);
        outline: 0;

        &::placeholder {
          font-size: 1rem;
          color: var(--neutral-gray-light);
        }
      }
    `,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    search: [''],
  })
  isFocus = false
  searchSubscription?: Subscription

  @Input() placeholder?: string
  @Input() debounceTime = 400
  @Input() style?: IStyle

  @Output() onSearch = new EventEmitter<string | null>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchSubscription = this.search.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe((value) => {
        this.onSearch.emit(value)
      })
  }

  get classes(): { [key: string]: boolean } {
    return {
      'hc-search-focus': this.isFocus,
    }
  }

  get search(): FormControl {
    return this.form.get('search') as FormControl
  }

  onFocus(): void {
    this.isFocus = true
  }

  onBlur(): void {
    this.isFocus = false
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}

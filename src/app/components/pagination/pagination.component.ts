import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'

interface IPaginationState {
  page: number
  pageCount: number
  rows: number
  first: number
  totalRecords: number
}

export interface IPageChange {
  page: number
  pageCount: number
  first: number
  rows: number
}

@Component({
  selector: 'hc-pagination',
  template: `
    <div class="wrapper-pagination">
      <button [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)">
        <span class="material-symbols-outlined icon-size">
          keyboard_double_arrow_left
        </span>
      </button>
      <button [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)">
        <span class="material-symbols-outlined icon-size">chevron_left</span>
      </button>
      <button
        *ngFor="let pageLink of pageLinks"
        [ngClass]="{ 'hc-highlight-pagination': pageLink - 1 === getPage() }"
        (click)="onPageLinkClick($event, pageLink - 1)"
      >
        {{ pageLink }}
      </button>
      <button [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)">
        <span class="material-symbols-outlined icon-size">chevron_right</span>
      </button>
      <button [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)">
        <span class="material-symbols-outlined icon-size">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>
  `,
  styles: [
    `
      .wrapper-pagination {
        display: flex;

        button:first-child {
          margin-left: 0;
        }

        button {
          margin: 0 2px;
        }
      }

      .hc-highlight-pagination {
        background-color: var(--primary-default);
        color: var(--neutral-white);
        border: 1px solid var(--primary-default);
      }

      .icon-size {
        font-size: 18px;
      }

      button {
        width: 32px;
        height: 32px;
        background-color: var(--neutral-white);
        color: var(--neutral-black);
        border: 1px solid var(--neutral-divider);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: 700;

        &:disabled {
          color: var(--neutral-divider);
          cursor: default;
          opacity: 0.7;
        }
      }
    `,
  ],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageLinkSize = 5

  @Input() rows = 0

  @Input() totalRecords = 0

  @Output() pageChangeEvent = new EventEmitter<IPageChange>()

  paginationState!: IPaginationState

  pageLinks!: number[]

  _first = 0

  ngOnInit(): void {
    this.updatePaginationState()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalRecords']) {
      this.updatePageLinks()
      this.updatePaginationState()
    }

    if (changes['rows']) {
      this.updatePageLinks()
      this.updatePaginationState()
    }

    if (changes['first']) {
      this._first = changes['first'].currentValue
      this.updatePageLinks()
      this.updatePaginationState()
    }
  }

  @Input() get first(): number {
    return this._first
  }

  set first(val: number) {
    this._first = val
  }

  calculatePageLinkBoundaries(): number[] {
    const numberOfPages = this.getPageCount()
    const visiblePages = Math.min(this.pageLinkSize, numberOfPages)

    // calculate range, keep current in middle if necessary
    let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2))
    const end = Math.min(numberOfPages - 1, start + visiblePages - 1)

    // check when approaching to last page
    const delta = this.pageLinkSize - (end - start + 1)
    start = Math.max(0, start - delta)

    return [start, end]
  }

  updatePageLinks() {
    this.pageLinks = []
    const boundaries = this.calculatePageLinkBoundaries()
    const start = boundaries[0]
    const end = boundaries[1]

    for (let i = start; i <= end; i++) {
      this.pageLinks.push(i + 1)
    }
  }

  changePage(page: number) {
    const pageCount = this.getPageCount()

    if (page >= 0 && page < pageCount) {
      this._first = this.rows * page
      const state = {
        page: page + 1,
        pageCount,
        first: this._first,
        rows: this.rows,
      }

      this.updatePageLinks()
      this.pageChangeEvent.emit(state)
      this.updatePaginationState()
    }
  }

  isFirstPage(): boolean {
    return this.getPage() === 0
  }

  isLastPage(): boolean {
    return this.getPage() === this.getPageCount() - 1
  }

  getPage(): number {
    return Math.floor(this.first / this.rows)
  }

  getPageCount() {
    return Math.ceil(this.totalRecords / this.rows)
  }

  onPageLinkClick(event: MouseEvent, page: number) {
    this.changePage(page)
    event.preventDefault()
  }

  changePageToFirst(event: MouseEvent) {
    if (!this.isFirstPage()) {
      this.changePage(0)
    }

    event.preventDefault()
  }

  changePageToPrev(event: MouseEvent) {
    this.changePage(this.getPage() - 1)
    event.preventDefault()
  }

  changePageToNext(event: MouseEvent) {
    this.changePage(this.getPage() + 1)
    event.preventDefault()
  }

  changePageToLast(event: MouseEvent) {
    if (!this.isLastPage()) {
      this.changePage(this.getPageCount() - 1)
    }

    event.preventDefault()
  }

  updatePaginationState() {
    this.paginationState = {
      page: this.getPage(),
      pageCount: this.getPageCount(),
      rows: this.rows,
      first: this.first,
      totalRecords: this.totalRecords,
    }
  }

  empty(): boolean {
    return this.getPageCount() === 0
  }
}

import { Component, OnInit } from '@angular/core'

import { MswService } from './msw.service'
import { worker } from 'src/mocks/browser'

@Component({
  selector: 'hc-msw',
  template: `
    <div class="wrapper-msw">
      <div>
        <svg
          viewBox="0 0 122 122"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          height="40"
          width="40"
        >
          <title>msw-logo</title>
          <g id="msw-logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(-44.297427, -47.574576)" stroke-width="21">
              <g
                transform="translate(107.297427, 108.074576) rotate(-42.000000) translate(-107.297427, -108.074576) translate(36.297427, 26.574576)"
              >
                <path
                  d="M75.1396666,46.668325 C78.6024919,46.668325 81.7374919,48.0719124 84.0067856,50.341206 C86.2760793,52.6104997 87.6796666,55.7454997 87.6796666,59.208325 C87.6796666,62.3036716 86.534852,65.2896505 84.4655356,67.5916279 L84.4655356,67.5916279 L48.2320648,107.898963 C47.5120934,108.699884 46.5356444,109.133155 45.5389581,109.186204 C44.5422718,109.239252 43.5253482,108.912077 42.7244276,108.192106 L42.7244276,108.192106 L6.19781435,67.5916279 C3.88282918,65.0163603 2.8308369,61.7465599 3.00140781,58.5418302 C3.17197873,55.3371004 4.56511284,52.1974412 7.14038046,49.882456 C9.44235787,47.8131396 12.4283368,46.668325 15.5236833,46.668325 L15.5236833,46.668325 Z"
                  id="back"
                  stroke="#7A1818"
                  transform="translate(45.331675, 81.500000) rotate(90.000000) translate(-45.331675, -81.500000) "
                ></path>
                <path
                  d="M145.86082,46.668325 C146.937775,46.668325 147.912775,47.1048474 148.618536,47.8106086 C149.324297,48.5163698 149.76082,49.4913698 149.76082,50.568325 C149.76082,51.5309926 149.404777,52.4596464 148.76121,53.1755724 L148.76121,53.1755724 L99.5687149,107.898963 C98.8487435,108.699884 97.8722944,109.133155 96.8756081,109.186204 C95.8789218,109.239252 94.8619983,108.912077 94.0610777,108.192106 L94.0610777,108.192106 L44.5754404,53.1755724 C43.8554689,52.3746518 43.5282943,51.3577282 43.5813427,50.3610419 C43.634391,49.3643556 44.0676624,48.3879066 44.868583,47.6679352 C45.584509,47.0243679 46.5131627,46.668325 47.4758303,46.668325 L47.4758303,46.668325 Z"
                  id="front"
                  stroke="#FF6A33"
                  transform="translate(96.668325, 81.500000) rotate(-90.000000) translate(-96.668325, -81.500000) "
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div>Mock Service Worker</div>
      <div>
        <button
          (click)="toggleStartOrStopMockServiceWorker()"
          [ngClass]="{ 'start': !isStart, 'stop': isStart }"
          aria-label="msw"
        >
          <span class="material-symbols-outlined" style="font-size: 34px">
            {{ isStart ? 'stop_circle' : 'play_circle' }}
          </span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper-msw {
        display: flex;
        align-items: center;
        width: 400px;

        div {
          margin: 4px;
        }
      }

      button {
        border: none;
        color: var(--neutral-white);
        padding: 4px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .start {
        background-color: var(--green-default);
      }

      .stop {
        background-color: var(--red-default);
      }
    `,
  ],
})
export class MswComponent implements OnInit {
  isStart = false

  constructor(private mswService: MswService) {}

  ngOnInit(): void {
    this.setInitialState()
    this.startOrStopMockServiceWorker()
  }

  setInitialState(): void {
    this.isStart = this.mswService.getMockServiceWorkerLocalStorage()
  }

  toggleStartOrStopMockServiceWorker() {
    this.isStart = !this.isStart
    this.mswService.setMockServiceWorkerLocalStorage(this.isStart)
    this.startOrStopMockServiceWorker()
  }

  startOrStopMockServiceWorker() {
    if (this.isStart) {
      this.startMoCkServiceWorker()
    } else {
      this.stopMockServiceWorker()
    }
  }

  startMoCkServiceWorker() {
    worker.start()
  }

  stopMockServiceWorker() {
    worker.stop()
  }
}

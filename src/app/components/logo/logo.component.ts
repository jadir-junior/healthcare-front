import { Component } from '@angular/core'

@Component({
  selector: 'hc-logo',
  template: `
    <div class="hc-logo-wrapper">
      <div class="hc-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <circle style="fill:#336cfb;" cx="256" cy="256" r="256" />
          <path
            style="fill:#102866;"
            d="M497.447,341.237L383.564,227.354l-35.204,30.787L215.093,126.309l-34.506,154.784l-27.298,17.798  L348.979,494.58C418.13,467.611,472.66,411.448,497.447,341.237z"
          />
          <g>
            <path
              style="fill:#FFFFFF;"
              d="M184.889,312.889L184.889,312.889c-23.564,0-42.667-19.103-42.667-42.667V156.444   c0-23.564,19.103-42.667,42.667-42.667l0,0c23.564,0,42.667,19.103,42.667,42.667v113.778   C227.556,293.786,208.453,312.889,184.889,312.889z"
            />
            <path
              style="fill:#FFFFFF;"
              d="M227.556,156.444c0-23.564-19.103-42.667-42.667-42.667s-42.667,19.103-42.667,42.667v55.884h85.333   V156.444z"
            />
          </g>
          <path
            style="fill:#D0D1D3;"
            d="M227.556,156.444c0-23.564-19.103-42.667-42.667-42.667c-0.048,0-0.095,0.003-0.143,0.003v98.547  h42.81V156.444z"
          />
          <path
            style="fill:#FF314F;"
            d="M142.222,212.328v57.894c0,23.564,19.103,42.667,42.667,42.667s42.667-19.103,42.667-42.667v-57.894  H142.222z"
          />
          <path
            style="fill:#A30F44;"
            d="M184.746,212.328v100.559c0.048,0,0.095,0.003,0.143,0.003c23.564,0,42.667-19.103,42.667-42.667  V212.33h-42.81V212.328z"
          />
          <g>
            <path
              style="fill:#FFFFFF;"
              d="M379.225,222.808L379.225,222.808c17.479,15.803,18.839,42.784,3.034,60.263l-76.305,84.397   c-15.803,17.479-42.784,18.837-60.263,3.034l0,0c-17.479-15.803-18.839-42.784-3.034-60.263l76.305-84.397   C334.764,208.363,361.744,207.005,379.225,222.808z"
            />
            <path
              style="fill:#FFFFFF;"
              d="M242.655,310.239c-15.803,17.479-14.445,44.46,3.034,60.263   c17.479,15.803,44.46,14.445,60.264-3.034l37.478-41.453l-63.298-57.229L242.655,310.239z"
            />
          </g>
          <path
            style="fill:#D0D1D3;"
            d="M244.991,369.838c0.234,0.221,0.459,0.448,0.698,0.664c17.479,15.803,44.46,14.445,60.263-3.034  l37.478-41.451l-31.965-28.901L244.991,369.838z"
          />
          <path
            style="fill:#FF314F;"
            d="M343.431,326.016l38.828-42.944c15.803-17.479,14.445-44.46-3.034-60.263s-44.46-14.445-60.264,3.034  l-38.828,42.944L343.431,326.016z"
          />
          <path
            style="fill:#A30F44;"
            d="M379.313,222.892l-67.846,74.223l31.965,28.901l38.828-42.944  C398.034,265.623,396.705,238.707,379.313,222.892z"
          />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
      <h1 class="hc-logo-text">Healthcare</h1>
    </div>
  `,
  styles: [
    `
      .hc-logo-wrapper {
        display: flex;
        align-items: center;
      }

      .hc-logo {
        margin-right: 1rem;
      }

      .hc-logo-text {
        font-size: 1.5rem;
        color: var(--primary-default);
      }
    `,
  ],
})
export class LogoComponent {}

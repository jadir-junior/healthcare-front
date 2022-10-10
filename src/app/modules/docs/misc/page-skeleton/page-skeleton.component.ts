import { Component } from '@angular/core'

@Component({
  selector: 'app-page-skeleton',
  template: `
    <div class="hc-docs-title">
      <h2>Skeleton</h2>
      <p class="body1">Skeleton é um placeholder que é exibido antes do conteudo</p>
    </div>
    <hc-card>
      <div class="hc-content-card-50">
        <h5 style="margin-bottom: 1.5rem;">Retangulo</h5>
        <div class="hc-skeleton-wrapper">
          <hc-skeleton></hc-skeleton>
        </div>
        <div class="hc-skeleton-wrapper">
          <hc-skeleton width="30%"></hc-skeleton>
        </div>
        <div class="hc-skeleton-wrapper">
          <hc-skeleton width="20%"></hc-skeleton>
        </div>
        <div class="hc-skeleton-wrapper">
          <hc-skeleton width="30%" height="2rem"></hc-skeleton>
        </div>
        <div class="hc-skeleton-wrapper">
          <hc-skeleton width="20%" height="3rem"></hc-skeleton>
        </div>
        <h5 style="margin-bottom: 1.5rem">Quadrado</h5>
        <div style="display: flex; align-items: flex-end; gap: 1rem;">
          <hc-skeleton size="40px"></hc-skeleton>
          <hc-skeleton size="60px"></hc-skeleton>
          <hc-skeleton size="80px"></hc-skeleton>
        </div>
      </div>
    </hc-card>
  `,
  styles: [
    `
      .hc-skeleton-wrapper {
        margin: 1rem 0;
      }

      .hc-content-card-50 {
        width: 50%;
      }
    `,
  ],
})
export class PageSkeletonComponent {}

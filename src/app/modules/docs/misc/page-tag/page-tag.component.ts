import { Component } from '@angular/core'
import { IColumn } from './../../../../components/table/table.component'

@Component({
  selector: 'app-page-tag',
  template: `
    <div class="hc-docs-title">
      <h2>Tag</h2>
      <p class="body1">Tag component é usado para categorizar um conteudo.</p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <div style="margin-bottom: 1.5rem;">
          <h5 style="margin-bottom: 1rem;">Tags</h5>
          <div class="hc-tag-wrapper">
            <div>
              <hc-tag severity="primary">Primary</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="success">Success</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="info">Info</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="warning">Warning</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="danger">Danger</hc-tag>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h5 style="margin-bottom: 1rem;">Pills</h5>
          <div class="hc-tag-wrapper">
            <div>
              <hc-tag severity="primary" [rounded]="true">Primary</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="success" [rounded]="true">Success</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="info" [rounded]="true">Info</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="warning" [rounded]="true">Warning</hc-tag>
            </div>
            <div style="margin-left: 1rem;">
              <hc-tag severity="danger" [rounded]="true">Danger</hc-tag>
            </div>
          </div>
        </div>
      </hc-card>
    </div>
    <h4 class="hc-docs-documentaion">Documentação</h4>

    <div class="hc-docs-section">
      <h5>Import</h5>
      <markdown src="/assets/docs/misc/tag/import.ts"></markdown>
    </div>

    <div class="hc-docs-section">
      <h5>Severity</h5>
      <p class="body1">
        Uma <i class="hc-docs-value">severity</i> pode ser usado para exibir o
        <i class="hc-docs-value">background</i> de uma tag, com diferentes cores
        <i class="hc-docs-value">success | info | warning | danger</i>
      </p>
      <markdown
        src="/assets/docs/misc/tag/tag-severity.html"
        ngPreserveWhitespaces
      ></markdown>
    </div>

    <div class="hc-docs-section">
      <h5>Rounded</h5>
      <p class="body1">
        Com o <i class="hc-docs-value">rounded</i> você pode transforma a tag em uma
        <i class="hc-docs-value">pill</i>
      </p>
      <markdown src="/assets/docs/misc/tag/tag-pill.html"></markdown>
    </div>

    <div class="hc-docs-section">
      <h5>Propriedades</h5>
      <hc-table [value]="props" [columns]="cols" [responsive]="true">
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns">{{ column.header }}</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-prop let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">{{ prop[col.field] }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </div>
  `,
  styles: [
    `
      .hc-tag-wrapper {
        display: flex;
      }
    `,
  ],
})
export class PageTagComponent {
  cols: IColumn[] = [
    { header: 'Name', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Default', field: 'default' },
    { header: 'Description', field: 'description' },
  ]

  props = [
    {
      name: 'severity',
      type: 'primary | success | info | warning | danger',
      default: 'primary',
      description: 'Severity tipo da tag',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      description: 'Torna a tag uma pill',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      description: 'Inline estilo do component',
    },
  ]
}

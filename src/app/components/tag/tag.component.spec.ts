import { render, screen } from '@testing-library/angular'

import { TagComponent } from './tag.component'

describe('TagComponent', () => {
  it('create a tag default primary', async () => {
    const { container } = await render(`<hc-tag>primary</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(container).toBeInTheDocument()
    expect(screen.getByText(/primary/i)).toBeInTheDocument()
    expect(screen.getByRole('tag')).toHaveClass('hc-tag-primary')
  })

  it('create a tag success', async () => {
    await render(`<hc-tag severity="success">Success</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(screen.getByRole('tag')).toHaveClass('hc-tag-success')
  })

  it('create a tag info', async () => {
    await render(`<hc-tag severity="info">info</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(screen.getByRole('tag')).toHaveClass('hc-tag-info')
  })

  it('create a tag warning', async () => {
    await render(`<hc-tag severity="warning">warning</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(screen.getByRole('tag')).toHaveClass('hc-tag-warning')
  })

  it('create a tag danger', async () => {
    await render(`<hc-tag severity="danger">danger</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(screen.getByRole('tag')).toHaveClass('hc-tag-danger')
  })

  it('create a tag rounded', async () => {
    await render(`<hc-tag severity="danger" [rounded]="true">danger</hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(screen.getByRole('tag')).toHaveClass('hc-tag-rounded')
  })
})

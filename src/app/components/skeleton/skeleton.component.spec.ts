import { SkeletonComponent } from './skeleton.component'
import { render } from '@testing-library/angular'

describe('SkeletonComponent', () => {
  it('create skeleton', async () => {
    const { container } = await render(SkeletonComponent)
    expect(container).toBeInTheDocument()
  })
})

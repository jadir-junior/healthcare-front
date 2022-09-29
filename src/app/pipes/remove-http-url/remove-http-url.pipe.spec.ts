import { RemoveHttpUrlPipe } from './remove-http-url.pipe'

describe('RemoveHttpUrlPipe', () => {
  let pipe: RemoveHttpUrlPipe

  beforeEach(() => {
    pipe = new RemoveHttpUrlPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('remove https:// to url', () => {
    expect(pipe.transform('https://facebook.com.br/john-doe')).toBe(
      'facebook.com.br/john-doe'
    )
  })

  it('if null return string empty', () => {
    expect(pipe.transform(null)).toBe('')
  })
})

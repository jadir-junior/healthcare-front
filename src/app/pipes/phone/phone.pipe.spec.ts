import { PhonePipe } from './phone.pipe'

describe('PhonePipe', () => {
  let pipe: PhonePipe

  beforeEach(() => {
    pipe = new PhonePipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('if null return string empty', () => {
    expect(pipe.transform(null)).toBe('')
  })

  it('format phone number 1145351132 to (11) 4535-1132', () => {
    expect(pipe.transform('1145351132')).toBe('(11) 4535-1132')
  })

  it('format phone number 11999609711 to (11) 99960-9711', () => {
    expect(pipe.transform('11999609711')).toBe('(11) 99960-9711')
  })

  it(`if number or string not match with number BR return a empty string`, () => {
    expect(pipe.transform('1238128309182038')).toBe('')
  })
})

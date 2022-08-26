import { FormControl } from '@angular/forms'
import { PasswordStrengthValidator } from './password-strength.validators'

describe('Password Strength Validators', () => {
  it('should return a error if not pass with minimun 8 characters', () => {
    const value = new FormControl('Mick27*')

    expect(PasswordStrengthValidator(value)).toEqual({ passwordStrength: true })
  })

  it('should return a error if not pass one letter uppercase', () => {
    const value = new FormControl('mick1234*')

    expect(PasswordStrengthValidator(value)).toEqual({ passwordStrength: true })
  })

  it('should return a error if not pass one letter lowercase', () => {
    const value = new FormControl('MICK1234*')

    expect(PasswordStrengthValidator(value)).toEqual({ passwordStrength: true })
  })

  it('should return a error if not pass one number', () => {
    const value = new FormControl('MICKjagger*')

    expect(PasswordStrengthValidator(value)).toEqual({ passwordStrength: true })
  })

  it('should return a error if not pass one special character', () => {
    const value = new FormControl('Mick12345')

    expect(PasswordStrengthValidator(value)).toEqual({ passwordStrength: true })
  })

  it('should pass password strength', () => {
    const value = new FormControl('Mick1234*')

    expect(PasswordStrengthValidator(value)).toBe(null)
  })
})

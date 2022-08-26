import { AbstractControl, ValidationErrors } from '@angular/forms'

export const PasswordStrengthValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value || ''

  if (!value) {
    return null
  }

  const eigthCharacters = /(?=.{8,})/g
  if (eigthCharacters.test(value) === false) {
    return { passwordStrength: true }
  }

  const upperCaseCharacters = /(?=.*[A-Z])/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: true }
  }

  const lowercaseCharacters = /(?=.*[a-z])/g
  if (lowercaseCharacters.test(value) === false) {
    return { passwordStrength: true }
  }

  const digits = /(?=.*[0-9])/g
  if (digits.test(value) === false) {
    return { passwordStrength: true }
  }

  const specialCharacters = /([^A-Za-z0-9])/g
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: true }
  }

  return null
}

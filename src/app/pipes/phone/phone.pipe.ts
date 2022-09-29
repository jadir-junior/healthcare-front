import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return ''
    }

    if (value.length === 11) {
      return value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3')
    }

    if (value.length === 10) {
      return value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3')
    }

    return ''
  }
}

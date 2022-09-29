import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'removeHttpUrl',
})
export class RemoveHttpUrlPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return ''
    }

    return value.replace(/(^\w+:|^)\/\//, '')
  }
}

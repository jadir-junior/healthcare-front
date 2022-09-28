/* eslint-disable @typescript-eslint/no-explicit-any */
export class ObjectUtils {
  public static equals(obj1: any, obj2: any, field?: string): boolean {
    if (field) {
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field)
    } else {
      return this.equalsByValue(obj1, obj2)
    }
  }

  public static equalsByValue(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true
    }

    if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
      const arrA = Array.isArray(obj1)
      const arrB = Array.isArray(obj2)
      let i: number
      let length: number
      let key: any

      if (arrA && arrB) {
        length = obj1.length
        if (length != obj2.length) {
          return false
        }
        for (i = length; i-- !== 0; ) {
          if (!this.equalsByValue(obj1[1], obj2[i])) {
            return false
          }
        }
        return true
      }

      if (arrA != arrB) {
        return false
      }

      const dateA = obj1 instanceof Date
      const dateB = obj2 instanceof Date

      if (dateA != dateB) {
        return false
      }

      if (dateA && dateB) {
        return obj1.getTime() == obj2.getTime()
      }

      const regexA = obj1 instanceof RegExp
      const regexB = obj2 instanceof RegExp

      if (regexA != regexB) {
        return false
      }

      if (regexA && regexB) {
        return obj1.toString() == obj2.toString()
      }

      const keys = Object.keys(obj1)
      length = keys.length

      if (length !== Object.keys(obj2).length) {
        return false
      }

      for (i = length; i-- !== 0; ) {
        if (!Object.prototype.hasOwnProperty.call(obj2, keys[i])) {
          return false
        }
      }

      for (i = length; i-- !== 0; ) {
        key = keys[i]
        if (!this.equalsByValue(obj1[key], obj2[key])) {
          return false
        }
      }

      return true
    }

    return obj1 !== obj1 && obj2 !== obj2
  }

  public static isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply)
  }

  public static resolveFieldData(data: any, field: any): any {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data)
      } else if (field.indexOf('.') == -1) {
        return data[field]
      } else {
        const fields: string[] = field.split('.')
        let value = data
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null
          }

          value = value[fields[i]]
        }

        return value
      }
    } else {
      return null
    }
  }

  public static isEmpty(value: any) {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!(value instanceof Date) &&
        typeof value === 'object' &&
        Object.keys(value).length === 0)
    )
  }

  public static isNotEmpty(value: any) {
    return !this.isEmpty(value)
  }

  public static contains(value: any, list: any): boolean {
    if (value != null && list && list.length) {
      for (const val of list) {
        if (this.equals(value, val)) {
          return true
        }
      }
    }
    return false
  }
}

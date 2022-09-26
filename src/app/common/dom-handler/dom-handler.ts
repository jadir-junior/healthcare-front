interface IDimensions {
  width: number
  height: number
}

interface IViewport {
  width: number
  height: number
}

export interface IOffset {
  top: number
  left: number
}

export class DomHandler {
  public static isElement(obj: HTMLElement): boolean {
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj &&
          typeof obj === 'object' &&
          obj !== null &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === 'string'
  }

  public static appendChild(element: HTMLElement, target: HTMLElement): void {
    if (this.isElement(target)) {
      target.appendChild(element)
    } else {
      throw `Cannot append ${target} to ${element}`
    }
  }

  public static absolutePosition(element: HTMLElement, target: HTMLElement): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element)

    const elementOuterHeight = elementDimensions.height
    const elementOuterWidth = elementDimensions.width

    const targetOuterHeight = target.offsetHeight
    const targetOuterWidth = target.offsetWidth
    const targetOffset = target.getBoundingClientRect()

    const windowScrollTop = this.getWindowScrollTop()
    const windowScrollLeft = this.getWindowScrollLeft()

    const viewport = this.getViewport()

    let top: number
    let left: number

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight
      element.style.transformOrigin = 'bottom'

      if (top < 0) {
        top = windowScrollTop
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop
      element.style.transformOrigin = 'top'
    }

    if (targetOffset.left + elementOuterWidth > viewport.width) {
      left = Math.max(
        0,
        targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth
      )
    } else {
      left = targetOffset.left + windowScrollTop
    }

    element.style.top = top + 'px'
    element.style.left = left + 'px'
  }

  public static getHiddenElementDimensions(element: HTMLElement): IDimensions {
    const dimensions: IDimensions = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }

    element.style.display = 'none'
    element.style.visibility = 'visibility'

    return dimensions
  }

  public static getWindowScrollTop(): number {
    const doc = document.documentElement
    return (window.scrollY || doc.scrollTop) - (doc.clientLeft - 0)
  }

  public static getWindowScrollLeft(): number {
    const doc = document.documentElement
    return (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0)
  }

  public static getViewport(): IViewport {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight

    return { width, height }
  }

  public static getOffset(el: HTMLElement): IOffset {
    const { pageXOffset, pageYOffset } = window
    const { documentElement, body } = document
    const rect = el.getBoundingClientRect()

    return {
      top: rect.top + (pageYOffset || documentElement.scrollTop || body.scrollTop || 0),
      left:
        rect.left + (pageXOffset || documentElement.scrollLeft || body.scrollLeft || 0),
    }
  }

  public static addClass(element: HTMLElement, className: string): void {
    if (element.classList) {
      element.classList.add(className)
    } else {
      element.className += ' ' + className
    }
  }

  public static isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  }

  public static isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  public static findSingleElement(
    element: HTMLElement,
    selector: string
  ): HTMLElement | null {
    if (element) {
      return element.querySelector(selector)
    }

    return null
  }

  public static getScrollableParents(element: HTMLElement | null): HTMLElement[] {
    const scrollableParents = []

    if (element) {
      const parents = this.getParents(element)
      const overflowRegex = /(auto|scroll)/
      const overflowCheck = (node: HTMLElement) => {
        const styleDeclaration = window['getComputedStyle'](node, null)
        return (
          overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
        )
      }

      for (const parent of parents) {
        const scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors']
        if (scrollSelectors) {
          const selectors = scrollSelectors.split(',')
          for (const selector of selectors) {
            const el = this.findSingleElement(parent, selector)
            if (el && overflowCheck(el)) {
              scrollableParents.push(el)
            }
          }
        }

        if (parent.nodeType !== 9 && overflowCheck(parent)) {
          scrollableParents.push(parent)
        }
      }
    }

    return scrollableParents
  }

  public static getParents(
    element: HTMLElement,
    parents: HTMLElement[] = []
  ): HTMLElement[] {
    return element['parentElement'] === null
      ? parents
      : this.getParents(element.parentElement, parents.concat([element.parentElement]))
  }

  public static hasClass(element: HTMLElement, className: string): boolean {
    if (element.classList) {
      return element.classList.contains(className)
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
    }
  }

  public static removeClass(element: HTMLElement, className: string): void {
    if (element.classList) {
      element.classList.remove(className)
    } else {
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' '
      )
    }
  }
}

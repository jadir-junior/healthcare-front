export class ZIndexUtils {
  private static zIndexes: Array<{ key: string; value: number }> = []

  private static generateZIndex(key: string, baseZIndex: number): number {
    const lastZIndex =
      this.zIndexes.length > 0
        ? this.zIndexes[this.zIndexes.length - 1]
        : { key, value: baseZIndex }

    const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1

    this.zIndexes.push({ key, value: newZIndex })

    return newZIndex
  }

  private static revertZIndex(zIndex: number): void {
    this.zIndexes = this.zIndexes.filter((obj) => obj.value !== zIndex)
  }

  private static getZIndex(element: HTMLElement): number {
    return element ? parseInt(element.style.zIndex, 10) || 0 : 0
  }

  public static set(key: string, el: HTMLElement, baseZIndex: number) {
    if (el) {
      el.style.zIndex = String(this.generateZIndex(key, baseZIndex))
    }
  }

  public static clear(element: HTMLElement) {
    if (element) {
      this.revertZIndex(this.getZIndex(element))
      element.style.zIndex = ''
    }
  }
}

import '@geajs/core'

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      class?: any
      [key: string]: any
    }
  }
}

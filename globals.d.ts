import 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    class?: any;
  }
  interface SVGProps<T> extends SVGAttributes<T> {
    class?: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      class?: any;
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '@geajs/core' {
  export interface JSXAttributes {
    class?: string;
    [key: string]: any;
  }
}

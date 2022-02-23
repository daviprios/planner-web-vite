/// <reference types="vite/client" />

declare module "*?component"{
  import { HTMLAttributes } from "react"
  const content: (props: HTMLAttributes<HTMLElement>) => JSX.Element
  export default content
}
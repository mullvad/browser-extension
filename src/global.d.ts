declare const __DEV__: boolean;

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

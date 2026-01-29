declare module 'preact-router' {
  import { ComponentChildren, FunctionalComponent } from 'preact';

  export interface RouteProps<Props = {}> {
    path?: string;
    default?: boolean;
  }

  export interface RouterProps {
    children?: ComponentChildren;
    onChange?: (event: { url: string; previous?: string }) => void;
  }

  export default function Router(props: RouterProps): JSX.Element;
  export function Route<Props = {}>(props: RouteProps<Props> & Props): JSX.Element | null;
  export function route(url: string, replace?: boolean): boolean;
  export function getCurrentUrl(): string;
}

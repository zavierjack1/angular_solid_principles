export interface BaseWidget {
  title: string;
  data: any;
}

export interface Reloadable {
  loading: boolean;
  reload(): void;
}

export interface IOptions  {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH',
  headers?: Record<string,string>;
  body?: string;
}

export interface IFetchParams {
  url: string;
  options: IOptions;
}
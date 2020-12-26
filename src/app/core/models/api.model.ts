export interface QuerySort {
  order?: string;
  direction?: string;
}

export interface PageableParams {
  page?: number;
  sort?: QuerySort;
  size?: number;
}

export interface PageSlice {
  content: any[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  sort: any;
  size: number;
  number: number;
}

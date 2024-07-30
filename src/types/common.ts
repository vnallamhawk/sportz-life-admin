export type TabType = {
  label: string;
  name: string;
  value: string;
  image: string;
  allLabel: string;
  key:string
};

export type TableHead = {
  label: string;
  id: string;
}[];

export interface FormValues {
  type: string;
  label?:string
  rules?: any;
  id: string;
  pattern?: string;
  placeHolder?: string;
  isMulti?: boolean;
  options?: { label: string|undefined; value: string | number|undefined }[];
}
export interface TableFields {
  type: string;
  name:string
  placeholder?: string;
  options?: { label: string|undefined; value: string | number|undefined }[];
  isMulti?:boolean
}


// export type TableRows = {
//   name: string;
//   fee_type: string;
//   fee_amt: string;
//     status: string;
// }[];

// export type TableRows = {
//   img: string;
//   name: string;
//   t_level: any;
//   center: any;
//   batch: any;
//   status: string;
// };

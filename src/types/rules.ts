export interface Pattern {
  value: RegExp;
  message: string;
}

export interface MaxLength {
  value: number;
  message: string;
}

export interface Rules {
  required?: boolean;
  pattern?: Pattern;
  maxLength?: MaxLength;
}

export interface ICreateCommissionReqDto {
  title: string;
  description?: string;
  amount: number;
  duration?: string;
  inclusions?: string[];
}
export interface IResponseDto<T> {
  success: boolean;
  data: T;
}
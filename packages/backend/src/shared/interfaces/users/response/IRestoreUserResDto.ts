export interface IRestoreUserResDto {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    isActive: boolean;
  };
}
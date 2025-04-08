export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
  passwordChangedAt: string;
  passwordResetCode?: string;
  passwordResetExpires?: string;
  resetCodeVerified: boolean;
}

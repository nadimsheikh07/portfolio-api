import { UserType } from '../users/entities/user.entity';

export type AuthUser = {
  sub: number;
  email: string;
  userType: UserType;
};

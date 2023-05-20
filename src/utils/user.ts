import { UserRole, UserStatus } from 'src/enums/user';
import { getUserRoleLabel, getUserStatusLabel } from './translator';

export const userRoleOptions = Object.values(UserRole).map((value) => ({
  label: getUserRoleLabel(value),
  value,
}));

export const userStatusOptions = Object.values(UserStatus).map((value) => ({
  label: getUserStatusLabel(value),
  value,
}));

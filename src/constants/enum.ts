import { TFunction } from 'i18next';

export const enum UserRole {
  admin = 'admin',
  logistician = 'logistician',
  courier = 'courier',
  accountant = 'accountant',
  operator = 'operator',
  warehouse = 'warehouse',
}

export const UserRoleTitles = (t: TFunction) => ({
  [UserRole.admin]: t('roles.admin'),
  [UserRole.logistician]: t('roles.logistician'),
  [UserRole.courier]: t('roles.courier'),
  [UserRole.accountant]: t('roles.accountant'),
  [UserRole.operator]: t('roles.operator'),
  [UserRole.warehouse]: t('roles.warehouse'),
});

export const UserRoleArray = [
  UserRole.admin,
  UserRole.logistician,
  UserRole.courier,
  UserRole.accountant,
  UserRole.operator,
  UserRole.warehouse,
] as const;

export const UserRoleMap = {
  Admin: UserRole.admin,
  Logistician: UserRole.logistician,
  Courier: UserRole.courier,
  Accountant: UserRole.accountant,
  Operator: UserRole.operator,
  Warehouse: UserRole.warehouse,
};

export type UserRolesType =
  | UserRole.admin
  | UserRole.logistician
  | UserRole.courier
  | UserRole.accountant
  | UserRole.operator;

export const OrderFullAccessRoles = [
  UserRole.admin,
  UserRole.operator,
] as const;

export const OperatorAndCourierRoles = [
  UserRole.operator,
  UserRole.courier,
] as const;

export const OperatorAndCourierRolesTitles = {
  [UserRole.operator]: 'Operator',
  [UserRole.courier]: 'Kuryer',
} as const;

export const OperatorRole = {
  [UserRole.operator]: 'Operator',
} as const;

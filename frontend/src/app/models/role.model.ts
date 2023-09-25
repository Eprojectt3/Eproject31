export interface Role {
  id: number;
  name?: string;
}

export const role: Role[] = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
];

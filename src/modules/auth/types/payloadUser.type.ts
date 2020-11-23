import { User } from 'src/modules/user/schemas/user.schema';

export type PayloadUser = Omit<User, 'password'>;
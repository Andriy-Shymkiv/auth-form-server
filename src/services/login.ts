import { usersFromDataBase } from '../api/usersFromDataBase';

export const findUser = (login: string, password: string) => {
  return usersFromDataBase.find(
    user => user.login === login && user.password === password,
  );
};

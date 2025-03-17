export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public lastname: string,
    public firstname: string,
    public middlename: string,
    public birthdate: Date,
    public roles: []
) {}
}
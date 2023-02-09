/**
 * User model.
 */
export class UserModel {

  constructor(
    private _id: number | null,
    public name: string,
  ) {
  }

  get id(): number | null {
    return this._id;
  }
}
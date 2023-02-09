/**
 * User repository.
 */
import {CachedListAbstract} from '../Bases/CachedListAbstract';

import {UserModel} from './UserModel';

/**
 * User repository.
 */
class UserRepositoryClass extends CachedListAbstract {

  /**
   * {@inheritdoc}
   */
  getApiBaseRoute(): any {
    return 'users';
  }

  /**
   * {@inheritdoc}
   */
  getItemFromApiData(apiItemData: any): Promise<any> {
    return Promise.resolve(new UserModel(
      apiItemData.uid,
      apiItemData.name,
    ));
  }

}

export const UserRepository = new UserRepositoryClass();
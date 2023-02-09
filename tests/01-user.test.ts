import 'module-alias/register';
import {expect} from 'chai';
import {AuthService} from '@services/AuthService';

import {prepareApiManager} from './utils/prepare';
import {getUserData} from "./utils/users";

prepareApiManager();

describe('User API', async () => {


  /**
   * Test user connection.
   */
  it(`Should connect main user`, async () => {
    const userData: any = getUserData('default');
    await AuthService.login(userData.name, userData.password);
    const user = AuthService.getCurrentUser();
    expect(user).to.be.an('object').with.property('name').to.be.eq('user1');
  });
});
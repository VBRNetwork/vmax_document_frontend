/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import userSaga, { refreshUser, saveUser } from '../saga';

import { refreshedUser, saved } from '../actions';
import { REFRESH_USER, SAVE_USER } from '../constants';
import { makeSelectToken } from '../selectors';
import request from '../../../../utils/request';

describe('Save User Saga', () => {
  const generator = saveUser({
    user: { token: '', user: { profile: { completed: true } } },
  });
  const delay = time => new Promise(resolve => setInterval(resolve, time));

  it('should dispatch the saved action if it requests the data successfully', () => {
    const putDescriptor = generator.next().value;
    expect(putDescriptor).toEqual(
      put(saved({ token: '', user: { profile: { completed: true } } })),
    );
  });

  it.skip('should dispatch the call action if it requests the data successfully', () => {
    const dateNow = new Date();
    const utc = dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
    const time = utc + 3600000 * 3;
    const finalTime = 1000 - time - 50000;
    const func = call(delay, finalTime);
    const putDescriptor = generator.next().value;
    expect(putDescriptor).toEqual(func);
  });
});

describe('Refresh User Saga', () => {
  const generator = refreshUser();

  it('should select the token', () => {
    const putDescriptor = generator.next().value;
    expect(putDescriptor).toEqual(call(makeSelectToken));
  });

  it('should return the token', () => {
    const putDescriptor = generator.next(makeSelectToken).value;
    expect(putDescriptor).toEqual(select(makeSelectToken));
  });

  it('should call request', () => {
    const headers = {
      Authorization: '',
    };

    const body = {
      token: '',
    };

    const requestURL = `/accounts/auth/refresh`;

    const putDescriptor = generator.next('').value;
    expect(putDescriptor).toEqual(
      call(request, requestURL, headers, 'post', body),
    );
  });

  it('should dispatch the processedPayment action if it requests the data successfully', () => {
    const response = {
      data: {},
      status: 200,
      error: '',
    };
    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(refreshedUser(response.data)));
  });
});

describe('PrivacyPolicySaga Saga', () => {
  const generator = userSaga();
  it('should start task to watch for REFRESH_USER action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REFRESH_USER, refreshUser));
  });

  it('should start task to watch for SAVE_USER action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(SAVE_USER, saveUser));
  });
});

import { selectUserDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectPrivacyPolicyDomain', () => {
  it('should select the PrivacyAndPolicy Page state', () => {
    const mockedState = {
      user: initialState,
    };

    expect(selectUserDomain(mockedState)).toEqual(initialState);
  });
});

// @flow
import reducer from '../reducers';
import type { Contrib, ContribState, Amount } from '../reducers';

jest.mock('ophan', () => {});

describe('reducer tests', () => {

  const initialContrib: ContribState = {
    type: 'RECURRING',
    error: null,
    amount: {
      recurring: {
        value: '5',
        userDefined: false,
      },
      oneOff: {
        value: '25',
        userDefined: false,
      },
    },
  };
  const initialState = { contribution: initialContrib };

  it('should return the initial state', () => {

    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle CHANGE_CONTRIB_TYPE', () => {

    const contribType: Contrib = 'ONE_OFF';
    const action = {
      type: 'CHANGE_CONTRIB_TYPE',
      contribType,
    };

    expect(reducer(initialState, action).contribution.type).toEqual(contribType);
  });

  it('should handle CHANGE_CONTRIB_AMOUNT', () => {

    const amount: Amount = {
      value: '45',
      userDefined: true,
    };
    const action = {
      type: 'CHANGE_CONTRIB_AMOUNT',
      amount,
    };

    expect(reducer(initialState, action).contribution.amount.recurring).toEqual(amount);
    expect(reducer(initialState, action).contribution.amount.oneOff).toEqual(amount);
  });

  it('should handle CHANGE_CONTRIB_AMOUNT_RECURRING', () => {

    const amount: Amount = {
      value: '45',
      userDefined: true,
    };
    const action = {
      type: 'CHANGE_CONTRIB_AMOUNT_RECURRING',
      amount,
    };

    expect(reducer(initialState, action).contribution.amount.recurring).toEqual(amount);
    expect(reducer(initialState, action).contribution.amount.oneOff.value).toEqual('25');
  });

  it('should handle CHANGE_CONTRIB_AMOUNT_ONEOFF', () => {

    const amount: Amount = {
      value: '45',
      userDefined: true,
    };
    const action = {
      type: 'CHANGE_CONTRIB_AMOUNT_ONEOFF',
      amount,
    };

    expect(reducer(initialState, action).contribution.amount.oneOff).toEqual(amount);
    expect(reducer(initialState, action).contribution.amount.recurring.value).toEqual('5');
  });
});

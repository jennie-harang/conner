import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import { signInWithRedirectGoogle } from '@/services/api/auth';

import SignUp from './SignUpContainer';

jest.mock('@/services/api/auth');

describe('SignUp', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        auth: 'test',
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => render((
    <SignUp />
  ));

  it('SignUp 내용이 나타나야만 한다', () => {
    const { container } = renderSignUp();

    expect(container).toHaveTextContent('test');
  });

  describe('"로그인" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderSignUp();

      fireEvent.click(screen.getByText('로그인'));

      expect(signInWithRedirectGoogle).toBeCalled();
    });
  });
});

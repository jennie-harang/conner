import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignInModalContainer from './SignInModalContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignInModalContainer', () => {
  const dispatch = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockReplace.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        isVisible: given.isVisible,
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
      query: given.query,
    }));
    (useSession as jest.Mock).mockImplementation(() => [given.session]);
  });

  const renderSignInModalContainer = () => render((
    <SignInModalContainer />
  ));

  context('세션이 존재하는 경우', () => {
    given('session', () => 'user');

    it('아무것도 렌더링되지 않아야 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('query에 error가 존재한 경우', () => {
    given('isVisible', () => true);
    given('query', () => ({
      error: 'OAuthAccountNotLinked',
    }));

    describe('모달창이 에러 문구와 함께 나타난다', () => {
      it('"이미 가입된 이메일입니다." 문구가 나타나야만 하고, replace가 호출되어야만 한다', () => {
        const { container } = renderSignInModalContainer();

        expect(dispatch).toBeCalledWith({
          payload: true,
          type: 'auth/setSignInModalVisible',
        });
        expect(mockReplace).toBeCalledWith('/', undefined, { shallow: true });
        expect(container).toHaveTextContent('이미 가입된 이메일입니다.');
      });
    });
  });

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => true);
    it('"소셜 계정으로 계속하기" 문구가 나타야만 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toHaveTextContent('소셜 계정으로 계속하기');
    });

    describe('"X" 버튼을 누른다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSignInModalContainer();

        fireEvent.click(screen.getByTestId('close-icon'));

        expect(dispatch).toBeCalledWith({
          payload: false,
          type: 'auth/setSignInModalVisible',
        });
      });
    });
  });

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});

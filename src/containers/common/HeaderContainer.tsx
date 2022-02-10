import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignOut from '@/hooks/api/auth/useSignOut';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function HeaderContainer(): ReactElement {
  const { pathname } = useRouter();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: user } = useGetUser();
  const { mutate } = useSignOut();
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const onClickSignIn = () => setSignInModalVisible(true);
  const signOut = useCallback(() => mutate(), [mutate]);

  const handleScrollAction = () => setIsScrollTop(window.scrollY === 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAction);

    return () => window.removeEventListener('scroll', handleScrollAction);
  }, []);

  return (
    <Header
      signOut={signOut}
      isScrollTop={isScrollTop}
      onClick={onClickSignIn}
      user={user}
      isHome={pathname === '/'}
      isSignUp={pathname === '/signup'}
    />
  );
}

export default HeaderContainer;

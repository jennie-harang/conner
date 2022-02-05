import { useAuthUser } from '@react-query-firebase/auth';
import { renderHook } from '@testing-library/react-hooks';

import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useGetUser from './useGetUser';

jest.mock('@react-query-firebase/auth');

describe('useGetUser', () => {
  const useGetUserHook = () => renderHook(() => useGetUser(), {
    wrapper,
  });

  beforeEach(() => {
    (useAuthUser as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
  });

  context('user.data가 존재하지 않는 경우', () => {
    given('user', () => null);

    it('user에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useGetUserHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(null);
    });
  });

  context('user.data가 존재하는 경우', () => {
    given('user', () => FIXTURE_PROFILE);

    it('user에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useGetUserHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(FIXTURE_PROFILE);
    });
  });
});

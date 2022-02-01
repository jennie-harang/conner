import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';

import RecruitedPage from './recruited.page';

jest.mock('@/hooks/api/group/useFetchUserRecruitedGroups');

describe('RecruitedPage', () => {
  beforeEach(() => {
    (useFetchUserRecruitedGroups as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_GROUP],
      isLoading: false,
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: null,
      },
    }));
  });

  const renderRecruitedPage = () => render((
    <RecruitedPage />
  ));

  it('모집한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderRecruitedPage();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});

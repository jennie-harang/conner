/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import ThumbnailUpload from './ThumbnailUpload';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/storage/useUploadGroupThumbnail');

describe('ThumbnailUpload', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUploadGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderThumbnailUpload = () => render((
    <ThumbnailUpload />
  ));

  it('썸네일 등록 폼에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderThumbnailUpload();

    expect(container).toHaveTextContent('썸네일 등록하기');
  });
});

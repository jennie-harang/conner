import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import DetailStatusButton from '@/components/detail/DetailStatusButton';
import useApplyGroup from '@/hooks/api/applicant/useApplyGroup';
import useCancelApply from '@/hooks/api/applicant/useCancelApply';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import { Profile } from '@/models/auth';
import { ApplicantForm } from '@/models/group';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const user = useSelector(getAuth('user'));
  const { data: group } = useFetchGroup();
  const { data: applicants, isLoading } = useFetchApplicants();
  const { mutate: applyMutate } = useApplyGroup();
  const { mutate: applyCancelMutate } = useCancelApply();

  const onVisibleSignInModal = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);
  const onCancelApply = useCallback((applicantId: string) => {
    applyCancelMutate(applicantId);
  }, [applyCancelMutate]);

  const onApply = useCallback((applyFields: ApplicantForm) => applyMutate({
    ...applyFields,
    groupId: group.groupId,
    applicant: user as Profile,
  }), [group.groupId, user, applyMutate]);

  return (
    <DetailHeaderSection group={group}>
      <DetailStatusButton
        user={user}
        group={group}
        onApply={onApply}
        applicants={applicants}
        isApplicantsLoading={isLoading}
        onVisibleSignInModal={onVisibleSignInModal}
        onCancelApply={onCancelApply}
      />
    </DetailHeaderSection>
  );
}

export default DetailHeaderContainer;

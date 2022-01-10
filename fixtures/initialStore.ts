import { GroupStore } from '@/reducers/groupSlice';

const initialStore = {
  initialState: {
    authReducer: {
      auth: null,
      authError: null,
      user: 'user',
      isVisible: false,
    },
    groupReducer: {
      groupId: null,
      groups: [],
      group: null,
      comments: [],
      groupError: null,
      writeFields: {
        content: '',
        title: '',
        tags: [],
        category: '',
        recruitmentEndDate: '',
        recruitmentEndSetting: 'automatic',
      },
      tagsCount: [],
      isVisible: false,
      applicants: [],
    } as GroupStore,
  },
};

export default initialStore;

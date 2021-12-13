import { fireEvent, render, screen } from '@testing-library/react';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import NewWriteForm from './NewWriteForm';

describe('NewWriteForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderNewWriteForm = () => render((
    <NewWriteForm
      fields={WRITE_FIELDS_FIXTURE}
      onChange={handleChange}
    />
  ));

  const placeholderTexts = [
    '제목을 입력하세요',
    '내용을 입력하세요',
  ];

  it('팀 모집하기 작성 폼에 대한 인풋 창이 나타나야만 한다', () => {
    renderNewWriteForm();

    placeholderTexts.forEach((placeholderText) => {
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });
  });

  describe('인풋 창에 입력한다', () => {
    const inputValue = {
      name: 'title',
      value: 'test',
    };

    it('onChange 이벤트가 호출되야만 한다', () => {
      renderNewWriteForm();

      fireEvent.change(screen.getByPlaceholderText('제목을 입력하세요'), { target: inputValue });

      expect(handleChange).toBeCalledWith(inputValue);
    });
  });
});
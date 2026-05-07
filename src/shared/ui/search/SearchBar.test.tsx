import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import SearchBar from './SearchBar';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  const t = (key: string) => key;

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(t);
  });

  it('renders correctly with mocked translations', () => {
    render(<SearchBar value="test value" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('search');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'a');

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('is accessible via aria-label based on translations', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText('search');
    expect(input).toBeInTheDocument();
  });
});

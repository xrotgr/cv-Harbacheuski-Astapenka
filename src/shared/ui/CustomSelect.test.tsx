import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CustomSelect } from './CustomSelect';

describe('CustomSelect', () => {
  const options = [
    { value: 'apple', text: 'Apple' },
    { value: 'banana', text: 'Banana' },
    { value: 'cherry', text: 'Cherry' },
  ];

  const defaultProps = {
    label: 'Select Fruit',
    value: 'apple',
    options,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and current value', () => {
    render(<CustomSelect {...defaultProps} />);

    expect(screen.getByLabelText(/select fruit/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue('apple')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('opens a list of options when clicked', async () => {
    const user = userEvent.setup();
    render(<CustomSelect {...defaultProps} />);

    const selectButton = screen.getByRole('combobox', { name: /select fruit/i });

    await user.click(selectButton);

    const listbox = screen.getByRole('listbox');
    const optionsList = within(listbox).getAllByRole('option');

    expect(optionsList).toHaveLength(3);
    expect(optionsList[1]).toHaveTextContent('Banana');
  });

  it('calls onChange with the correct parameters when a new option is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<CustomSelect {...defaultProps} onChange={onChange} />);

    const selectButton = screen.getByRole('combobox', { name: /select fruit/i });
    await user.click(selectButton);

    const optionBanana = screen.getByRole('option', { name: 'Banana' });
    await user.click(optionBanana);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'banana' }),
      }),
      expect.anything()
    );
  });

  it('blocks interaction if the disable prop is passed', async () => {
    const user = userEvent.setup();
    render(<CustomSelect {...defaultProps} disabled={true} />);

    const selectButton = screen.getByRole('combobox', { name: /select fruit/i });

    expect(selectButton).toHaveAttribute('aria-disabled', 'true');

    await user.click(selectButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

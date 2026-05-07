import { useMutation } from '@apollo/client/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { DeleteCvDialog } from './DeleteCvDialog';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  MenuItem: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

const mockedUseMutation = useMutation as unknown as jest.Mock;
const mockedUseTranslations = useTranslations as unknown as jest.Mock;

describe('DeleteCvDialog', () => {
  const mockDeleteCv = jest.fn();
  const mockCommonT = jest.fn((key: string) => {
    if (key === 'delete') return 'Delete';
    if (key === 'cv') return 'CV';
    if (key === 'cancel') return 'Cancel';
    if (key === 'confirm') return 'Confirm';
    return key;
  });
  const mockDialogT = jest.fn((key: string) => {
    if (key === 'assuranceMessage') return 'Are you sure you want to delete';
    return key;
  });

  beforeEach(() => {
    mockDeleteCv.mockResolvedValue({});
    mockedUseMutation.mockReturnValue([mockDeleteCv, { loading: false }]);
    mockedUseTranslations.mockImplementation((key: string) => {
      if (key === 'common') return mockCommonT;
      if (key === 'DeleteCvDialog') return mockDialogT;
      return (k: string) => k;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens and closes dialog without mutation', async () => {
    const user = userEvent.setup();
    render(<DeleteCvDialog cvId="123" cvName="Test CV" />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

    await user.click(deleteButton);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
    expect(mockDeleteCv).not.toHaveBeenCalled();
  });

  it('calls delete mutation on confirm', async () => {
    const user = userEvent.setup();
    render(<DeleteCvDialog cvId="123" cvName="Test CV" />);

    await user.click(screen.getByRole('button', { name: /delete/i }));
    await user.click(screen.getByRole('button', { name: /confirm/i }));

    expect(mockDeleteCv).toHaveBeenCalledTimes(1);
    expect(mockDeleteCv).toHaveBeenCalledWith({
      variables: { cv: { cvId: '123' } },
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });
});

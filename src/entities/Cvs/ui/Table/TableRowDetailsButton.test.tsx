import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { TableRowDetailsButton } from './TableRowDetailsButton';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('../DeleteCvDialog/DeleteCvDialog', () => ({
  DeleteCvDialog: ({ cvName }: { cvId: string; cvName: string }) => (
    <button data-testid="delete-dialog-trigger">Delete {cvName}</button>
  ),
}));

describe('Cv TableRowDetailsButton', () => {
  const mockT = jest.fn((key: string) => {
    if (key === 'details') return 'Details';
    return key;
  });

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue(mockT);
  });

  it('opens menu when clicking the icon button', async () => {
    const user = userEvent.setup();
    render(<TableRowDetailsButton rowId="123" rowName="Test CV" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    const detailsLink = screen.getByRole('menuitem', { name: /details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/cvs/123/details');

    const deleteButton = screen.getByTestId('delete-dialog-trigger');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent('Delete Test CV');
  });
});

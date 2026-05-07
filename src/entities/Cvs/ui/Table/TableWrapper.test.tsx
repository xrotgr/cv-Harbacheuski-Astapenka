import { useSuspenseQuery } from '@apollo/client/react';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { useUser } from '@/UserProvider/UserContext';

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { getFilteredTableRows } from '../../lib/helpers/getFilteredTableRows';
import { getTableColumns } from '../../lib/helpers/getTableColumns';
import { getTableRows } from '../../lib/helpers/getTableRows';

import { TableWrapper } from './TableWrapper';

jest.mock('@apollo/client/react', () => ({
  useSuspenseQuery: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/UserProvider/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('../../lib/helpers/getTableColumns', () => ({
  getTableColumns: jest.fn(),
}));

jest.mock('../../lib/helpers/getTableRows', () => ({
  getTableRows: jest.fn(),
}));

jest.mock('../../lib/helpers/getFilteredTableRows', () => ({
  getFilteredTableRows: jest.fn(),
}));

jest.mock('@/shared/ui/table/SortableTable', () => ({
  __esModule: true,
  default: () => <div data-testid="sortable-table" />,
}));

const mockedUseTranslations = useTranslations as unknown as jest.Mock;
const mockedUseUser = useUser as unknown as jest.Mock;
const mockedUseSuspenseQuery = useSuspenseQuery as unknown as jest.Mock;
const mockedGetTableColumns = getTableColumns as unknown as jest.Mock;
const mockedGetTableRows = getTableRows as unknown as jest.Mock;
const mockedGetFilteredTableRows = getFilteredTableRows as unknown as jest.Mock;

describe('Cv TableWrapper', () => {
  const mockTranslations = jest.fn();
  const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
  const mockData = { user: { cvs: [] } };

  beforeEach(() => {
    mockedUseTranslations.mockReturnValue(mockTranslations);
    mockedUseUser.mockReturnValue(mockUser);
    mockedUseSuspenseQuery.mockReturnValue({ data: mockData });
    mockedGetTableColumns.mockReturnValue([]);
    mockedGetTableRows.mockReturnValue([]);
    mockedGetFilteredTableRows.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders SortableTable', () => {
    render(<TableWrapper searchValue="" handleInputReset={jest.fn()} />);
    expect(screen.getByTestId('sortable-table')).toBeInTheDocument();
  });

  it('calls getTableRows with user name', () => {
    render(<TableWrapper searchValue="" handleInputReset={jest.fn()} />);
    expect(mockedGetTableRows).toHaveBeenCalledWith(mockData, 'John');
  });

  it('falls back to email when name is missing', () => {
    mockedUseUser.mockReturnValue({ id: '1', name: null, email: 'only@email.com' });
    render(<TableWrapper searchValue="" handleInputReset={jest.fn()} />);
    expect(mockedGetTableRows).toHaveBeenCalledWith(mockData, 'only@email.com');
  });

  it('calls getFilteredTableRows with searchValue', () => {
    render(<TableWrapper searchValue="abc" handleInputReset={jest.fn()} />);
    expect(mockedGetFilteredTableRows).toHaveBeenCalledWith([], 'abc');
  });
});

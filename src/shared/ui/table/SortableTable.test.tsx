import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import SortableTable from './SortableTable';

jest.mock('@/shared/lib/getComparator', () => ({
  getComparator:
    <T,>(order: 'asc' | 'desc', orderBy: keyof T) =>
    (a: T, b: T) => {
      const first = a[orderBy];
      const second = b[orderBy];

      if (first < second) {
        return order === 'asc' ? -1 : 1;
      }

      if (first > second) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    },
}));

jest.mock('./EmptyTableState', () => ({
  EmptyTableState: ({ colSpan, onReset }: { colSpan: number; onReset: () => void }) => (
    <tr data-testid="empty-state">
      <td colSpan={colSpan}>
        <button onClick={onReset}>Reset</button>
      </td>
    </tr>
  ),
}));

type Person = {
  id: string;
  name: string;
  age: number;
};

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
] satisfies readonly { id: keyof Person; label: string }[];

const rows: Person[] = [
  { id: '1', name: 'Charlie', age: 35 },
  { id: '2', name: 'Alice', age: 25 },
  { id: '3', name: 'Bob', age: 30 },
];

function MockRow({ row }: { row: Person }) {
  return (
    <tr data-testid="row">
      <td>{row.name}</td>
      <td>{row.age}</td>
    </tr>
  );
}

function getRenderedNames() {
  return screen.getAllByTestId('row').map((row) => within(row).getAllByRole('cell')[0].textContent);
}

describe('SortableTable', () => {
  it('renders column headers', () => {
    render(
      <SortableTable
        columns={columns}
        rows={rows}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /age/i })).toBeInTheDocument();
  });

  it('sorts ascending by default', () => {
    render(
      <SortableTable
        columns={columns}
        rows={rows}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    expect(getRenderedNames()).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('toggles descending sort when clicking active column', async () => {
    const user = userEvent.setup();

    render(
      <SortableTable
        columns={columns}
        rows={rows}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /name/i }));

    expect(getRenderedNames()).toEqual(['Charlie', 'Bob', 'Alice']);
  });

  it('sorts by another column', async () => {
    const user = userEvent.setup();

    render(
      <SortableTable
        columns={columns}
        rows={rows}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /age/i }));

    expect(getRenderedNames()).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('renders empty state when there are no rows', () => {
    render(
      <SortableTable
        columns={columns}
        rows={[]}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('calls handleInputReset from empty state', async () => {
    const user = userEvent.setup();
    const handleInputReset = jest.fn();

    render(
      <SortableTable
        columns={columns}
        rows={[]}
        rowComponent={MockRow}
        handleInputReset={handleInputReset}
      />
    );

    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(handleInputReset).toHaveBeenCalledTimes(1);
  });

  it('updates accessible sort direction text', async () => {
    const user = userEvent.setup();

    render(
      <SortableTable
        columns={columns}
        rows={rows}
        rowComponent={MockRow}
        handleInputReset={jest.fn()}
      />
    );

    expect(screen.getByText(/sorted ascending/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /name/i }));

    expect(screen.getByText(/sorted descending/i)).toBeInTheDocument();
  });
});

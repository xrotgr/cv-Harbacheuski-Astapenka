import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { AppBreadcrumbs } from './AppBreadcrumbs';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

describe('AppBreadcrumbs', () => {
  it('renders breadcrumb labels', () => {
    render(
      <AppBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Shoes' },
        ]}
      />
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Shoes')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(
      <AppBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Current Page' },
        ]}
      />
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');

    expect(screen.getByRole('link', { name: /products/i })).toHaveAttribute('href', '/products');
  });

  it('does not render a link when href is missing', () => {
    render(<AppBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]} />);

    expect(screen.queryByRole('link', { name: /current page/i })).not.toBeInTheDocument();

    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(
      <AppBreadcrumbs
        items={[
          {
            label: 'Home',
            href: '/',
            icon: <span data-testid="home-icon">🏠</span>,
          },
        ]}
      />
    );

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation landmark', () => {
    render(<AppBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const locale = await getLocale();

  redirect({
    href: {
      pathname: `/cvs/${id}/details`,
    },
    locale,
  });
}

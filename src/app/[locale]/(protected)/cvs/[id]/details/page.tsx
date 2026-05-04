import { Suspense } from 'react';

import { PreloadQuery } from '@/app/ApolloClient';
import { GET_CV } from '@/entities/Cvs/api/getCv';
import { UpdateCvForm } from '@/entities/Cvs/ui/UpdateCvForm/UpdateCvForm';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PreloadQuery query={GET_CV} variables={{ cvId: id }}>
      <Suspense fallback={<Spinner />}>
        <UpdateCvForm />
      </Suspense>
    </PreloadQuery>
  );
}

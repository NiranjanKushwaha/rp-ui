import { redirect } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

/** `/admin` has a layout but no index — send ops to the batches console. */
export default async function AdminIndexPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: '/admin/batches', locale });
}

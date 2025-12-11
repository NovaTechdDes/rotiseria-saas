import { startGetRotiseriaForDominio } from '@/actions';

interface Props {
  children: React.ReactNode;
  params: Promise<{ rotiseria: string }>;
}

const RotiseriaLayout = async ({ children, params }: Props) => {
  const { rotiseria } = await params;
  console.log(rotiseria);
  const data = await startGetRotiseriaForDominio(rotiseria);

  if (!data) return <div className="flex h-screen items-center justify-center text-2xl font-bold text-red-500">No se encontro la rotiseria</div>;

  return <>{children}</>;
};

export default RotiseriaLayout;

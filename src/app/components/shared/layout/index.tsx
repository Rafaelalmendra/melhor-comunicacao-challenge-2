import { Navbar } from 'components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
    </>
  );
};

export { Layout };

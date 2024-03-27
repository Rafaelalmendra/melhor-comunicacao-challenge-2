import { Footer, Navbar } from 'components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />

      <main
        className="w-full flex flex-col items-center"
        style={{
          minHeight: 'calc(100vh - 174px)',
        }}
      >
        <div className="max-w-7xl w-full flex flex-col items-center justify-center px-5 lg:px-0">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
};

export { Layout };

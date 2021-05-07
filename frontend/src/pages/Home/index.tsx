import { ReactNode } from 'react';

interface HomeProps {
  children: ReactNode;
}

function Home({ children }: HomeProps) {
  return (
    <>
      <h1>Home</h1>
      {children}
    </>
  );
}

export default Home;

import React, { useState } from 'react';

import HomeNavbar from '@/home/Navbar';
import WorldForm from './WorldForm';
import Container from '@/components/Container';
import WorldList from './WorldList';

const Home: React.FC = () => {
  const [showWorldForm, setShowWorldForm] = useState(false);

  return (
    <Container className="flex flex-col">
      <HomeNavbar />

      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-3xl font-medium sm:text-4xl md:mb-6 md:mt-12 md:text-5xl">
          Easy and simple world-building.
        </h1>
        <p className="mb-4 max-w-xl">
          <span className="font-bold">your world</span> is a free note-taking
          web app catered towards jotting down ideas and stacking up on that to
          make your world more and more fleshed out and detailed.
        </p>
      </div>

      <WorldForm
        show={showWorldForm}
        onToggle={() => setShowWorldForm((prev) => !prev)}
      />

      <WorldList />

      <div className="mb-14 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex flex-col text-center">
          <h2 className="mb-2 text-xl font-medium sm:text-2xl">
            Write it quick
          </h2>
          <p className="max-w-md">
            <span className="font-bold">your world</span> is primarily focused
            in speed and simplicity in exchange for complexity, it is very easy
            to start writing ideas without the hassle of thinking of the finer
            details.
          </p>
        </div>
        <div className="flex flex-col text-center">
          <h2 className="mb-2 text-xl font-medium sm:text-2xl">Fully Free</h2>
          <p className="max-w-md">
            There is no limit to how many worlds you can create nor any limit to
            how large a world becomes, no ads either as that is too complicated
            for me to set up.
          </p>
        </div>
        <div className="flex flex-col text-center">
          <h2 className="mb-2 text-xl font-medium sm:text-2xl">
            Made with love
          </h2>
          <p className="max-w-md">
            <span className="font-bold">your world</span> is a passion project
            made for writers by a writer. I swear this is not filler because I
            couldn’t think of third column.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;

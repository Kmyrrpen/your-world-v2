import React from 'react';

import Container from '@/components/Container';
import HomeNavbar from './HomeNavbar';
import CreateWorld from './CreateWorld';
import WorldList from './WorldList';

const Home: React.FC = () => {
  return (
    <Container>
      <HomeNavbar />

      <div className="mb-16">
        <h1 className="mb-3 text-xl font-bold sm:text-2xl md:mb-7 md:text-4xl xl:text-5xl">
          Easy and simple world-building.
        </h1>
        <div className="max-w-sm sm:max-w-lg lg:max-w-xl">
          <p className="mb-3 lg:mb-8">
            <span className="font-bold">your world</span> is a free note-taking
            web app catered towards jotting down ideas and stacking up on that
            to make your world more and more fleshed out and detailed.
          </p>
          <CreateWorld />
        </div>
      </div>

      <WorldList />

      <div className='flex flex-col lg:flex-row gap-4'>
        <div>
          <h2 className="font-bold text-lg">Write it quick</h2>
          <p className="max-w-xl">
            <span className="">your world</span> is primarily focused in speed
            and simplicity in exchange for complexity, it is very easy to start
            writing ideas without the hassle of thinking of the finer details.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Fully Free</h2>
          <p className="max-w-xl">
            There is no limit to how many worlds you can create nor any limit to
            how large a world becomes, no ads either as that is too complicated
            for me to set up.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Made with love</h2>
          <p className="max-w-xl">
            <span className="">your world</span> is a passion project made for
            writers by a writer. I swear this is not filler because I couldn’t
            think of third column.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;

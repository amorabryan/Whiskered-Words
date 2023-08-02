import './Global.css';
import { FaCat } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { BsJournalRichtext } from 'react-icons/bs';

export function About() {
  return (
    <div className="about-container about mt-24 flex-grow px-10 text-center">
      <div className="about flex-grow text-center">
        <h2 className="brown-text text-4xl text-gray-800">
          Welcome to Whiskered Words
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Welcome to Whiskered Words, an online journal platform where we
          celebrate the amazing bond you have with your fantastic felines.
          Create unique profiles, share adorable photos of your darlings, and
          jot down journal entries with style and flair. Join us now to
          celebrate the timeless connection between you and your extraordinary
          companions!
        </p>

        <h3 className="brown-text mt-4 text-2xl text-gray-700">Our Mission</h3>
        <p className="text-base leading-relaxed text-gray-600">
          Our mission is to celebrate the timeless bond between you and your
          extraordinary feline companions. We genuinely believe that the
          relationship between humans and their beloved cats is something truly
          special and should be cherished. That's why we aim to document and
          celebrate this beautiful connection in a way that feels both authentic
          and elegant.
        </p>

        <h3 className="brown-text mt-4 text-2xl text-gray-700">
          What Sets Us Apart
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-4 text-gray-600 sm:grid-cols-2 md:grid-cols-3">
          <li className="rounded-xl border bg-yellow-200 p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <RiProfileLine size={36} />
            </div>
            <strong className="mb-2 block">Unique Profiles</strong> Whiskered
            Words allows you to create personalized profiles for your feline
            friends, showcasing their quirks, habits, and unique personalities.
            Your cat's profile will be a special place to capture their essence
            and share it with the world.
          </li>
          <li className="rounded-xl border bg-orange-100 p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <FaCat size={36} />
            </div>
            <strong className="mb-2 block">Cat Photo Gallery</strong> Upload and
            display stunning photos of your feline darlings in our visually
            appealing galleries, giving them the spotlight they deserve.
          </li>
          <li className="rounded-xl border bg-gray-300 p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <BsJournalRichtext size={36} />
            </div>
            <strong className="mb-2 block">Create and Edit Entries</strong>{' '}
            Craft endearing entries about your cats, fondly referred to as
            "whiskers." You can save and edit these whiskers at any time,
            allowing you to create a journal that grows with your feline's
            journey.
          </li>
        </ul>

        <h3 className="brown-text mt-4 text-2xl text-gray-700">
          Join Us Today!
        </h3>
        <p className="mt-4 pb-4 text-base leading-relaxed text-gray-600">
          Whether you are a seasoned cat owner or a newcomer to the feline
          world, we invite you to become a part of Whiskered Words. Create
          unique profiles, upload photos of your furry companions, and craft
          whiskers that capture the magic of your feline-human bond. Join us in
          celebrating the love and companionship that our fantastic felines
          bring into our lives. Welcome to Whiskered Words!
        </p>
      </div>
    </div>
  );
}

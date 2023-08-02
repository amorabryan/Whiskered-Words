import './Global.css';
import { TbMailbox } from 'react-icons/tb';
import { MdContactPhone, MdOutlineMarkEmailUnread } from 'react-icons/md';

export function Contact() {
  return (
    <div className="contact-container about mt-24 flex-grow px-10 pb-4 text-center">
      <div className="about flex-grow text-center">
        <h2 className="brown-text text-4xl">CONTACT US</h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 text-gray-600 sm:grid-cols-2 md:grid-cols-3">
          <li className="rounded-xl border bg-blue-200 p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <TbMailbox size={36} />
            </div>
            <h3 className="mb-2 text-lg">
              Got something to send us? Send it to our P.O. Box:
            </h3>
            <p className="text-base">P.O Box: 7815</p>
            <p className="text-base">San Diego, CA 92116</p>
          </li>
          <li className="rounded-xl border bg-black p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <MdContactPhone size={36} />
            </div>
            <h3 className="mb-2 text-lg text-stone-200">
              Got a message or something to share? Text or drop it here:
            </h3>
            <p className="text-base text-stone-200">(619) 867-5309</p>
          </li>
          <li className="rounded-xl border bg-orange-300 p-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <MdOutlineMarkEmailUnread size={36} />
            </div>
            <h3 className="mb-2 text-lg">
              Need to shoot us an email? Send it to:
            </h3>
            <p className="text-base">whiskeredwords@gmail.com</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

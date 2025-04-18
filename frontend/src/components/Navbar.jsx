import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/logoWinery.png";

const products = [
  { name: "All Wines", href: "/products " },
  { name: "Red Wines", href: "/red-wines" },
  { name: "White Wines", href: "/white-wines" },
  { name: "Rose", href: "/rose" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-5 shadow-md">
      <nav
        aria-label="Global"
        className="w-full flex items-center justify-between px-6 lg:px-8 bg-charckoal"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={logo} className="h-16 md:h-22 w-auto md:w-22" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-panna"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 p-3 rounded-md hover:bg-darkercharcoal text-md/6 font-semibold text-panna">
              Products
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-panna"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-charckoal shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-6 rounded-lg p-4 text-md/6 hover:bg-darkercharcoal hover:scale-105 transition-transform duration-200"
                  >
                    <div className="flex-auto">
                      <Link
                        to={item.href}
                        className="block font-semibold text-panna"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            to="/about"
            className="text-md/6 font-semibold text-panna p-3 rounded-md hover:bg-darkercharcoal"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-md/6 font-semibold text-panna p-3 rounded-md hover:bg-darkercharcoal"
          >
            Contact Us
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/login"
            className="text-md/6 font-semibold text-panna p-3 rounded-md hover:bg-darkercharcoal"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          {/* Background overlay */}
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

          {/* Dialog panel */}
          <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-charckoal px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Your Company Logo"
                  src={logo}
                  className="h-16 w-auto"
                />
              </Link>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-panna hover:text-gray-300 hover:bg-darkercharcoal"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {products.map((item) => (
                    <Disclosure
                      key={item.name}
                      as="div"
                      className="-mx-3 hover:bg-darkercharcoal rounded-lg p-3 text-md font-semibold text-panna"
                    >
                      {({ open }) => (
                        <>
                          <DisclosureButton
                            as={Link}
                            to={item.href}
                            className="block w-full text-left"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </DisclosureButton>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
                <div className="space-y-2 py-6">
                  <Link
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-md font-semibold text-panna hover:bg-darkercharcoal"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-md font-semibold text-panna hover:bg-darkercharcoal"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer links */}
            <div className="py-6 flex gap-x-6 justify-center">
              <Link
                to="/login"
                className="text-md font-semibold text-panna p-3 rounded-md hover:bg-darkercharcoal"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </DialogPanel>
        </Dialog>
      </nav>
    </header>
  );
};

export default Navbar;
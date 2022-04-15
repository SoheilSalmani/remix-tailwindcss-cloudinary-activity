import { Link } from "@remix-run/react";
import {
  BookOpenIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import { Disclosure, Switch } from "@headlessui/react";
import * as React from "react";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export function Navbar() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <nav className="bg-gray-800 px-2">
      <Disclosure>
        {({ open }) => (
          <header>
            <div className="relative flex h-16 items-center justify-between">
              <Disclosure.Button className="absolute left-0 block rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                {open ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </Disclosure.Button>
              <div className="flex flex-grow justify-center">
                <Link
                  className="block rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  to="/"
                >
                  <BookOpenIcon className="h-11 w-12 text-indigo-400 hover:text-indigo-200" />
                </Link>
              </div>
              <div className="absolute right-0 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {enabled ? (
                    <MoonIcon className="h-7 w-7 text-gray-200" />
                  ) : (
                    <SunIcon className="h-7 w-7 text-yellow-500" />
                  )}
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? "bg-gray-500" : "bg-gray-400"
                    } relative inline-flex h-6 w-11 items-center rounded-full ring-offset-gray-800 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-white`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <button className="block rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <BellIcon className="h-6 w-6" />
                </button>
                <button className="mr-2 overflow-hidden rounded-full bg-gray-800  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="h-8 w-8"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </button>
              </div>
            </div>
            <Disclosure.Panel>
              <div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    className="block text-gray-300 hover:text-white"
                    key={item.name}
                    as="a"
                    href={item.href}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </header>
        )}
      </Disclosure>
    </nav>
  );
}

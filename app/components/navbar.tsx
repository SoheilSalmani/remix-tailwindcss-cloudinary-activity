import { Link } from "@remix-run/react";
import {
  TerminalIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import { Menu, Disclosure, Switch, Transition } from "@headlessui/react";
import * as React from "react";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <nav className="bg-gray-800 px-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Disclosure>
          {({ open }) => (
            <div>
              <div className="relative flex h-16 items-center justify-between">
                <Disclosure.Button className="absolute left-0 block rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white sm:hidden">
                  {open ? (
                    <XIcon className="h-6 w-6" />
                  ) : (
                    <MenuIcon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
                <div className="flex flex-grow justify-center sm:justify-start">
                  <Link
                    className="flex items-center gap-2 rounded-md p-1 text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-white"
                    to="/"
                  >
                    <TerminalIcon className="block h-9 w-9" />
                    <div className="hidden pr-1 text-lg font-extrabold uppercase tracking-wide text-white lg:block">
                      Terminal
                    </div>
                  </Link>
                  <div className="ml-6 hidden sm:flex sm:items-center sm:gap-4">
                    {navigation.map((item) => (
                      <a
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-white"
                        )}
                        key={item.name}
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute right-0 flex items-center gap-3">
                  <div className="hidden items-center gap-2 md:flex">
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
                      } relative inline-flex h-6 w-11 items-center rounded-full ring-offset-gray-800 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
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
                  <Menu as="div" className="mr-2">
                    <Menu.Button className="block overflow-hidden rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img
                        className="h-8 w-8"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                    </Menu.Button>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <Disclosure.Panel className="space-y-1 pb-3 pt-2 sm:hidden">
                {navigation.map((item) => (
                  <Disclosure.Button
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium outline-none focus:ring-2 focus:ring-white"
                    )}
                    key={item.name}
                    as="a"
                    href={item.href}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </nav>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useScroll from "@/hooks/useScroll";
import Logo from "/public/static/icon.svg";
import { CircleX, Menu, PersonStanding, Search, Swords } from "lucide-react";
import { NavBarItem } from "@/types/navbar.type";


export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const scrolling = useScroll();

  const menuItems:NavBarItem[] =[
    {
      title: "Personagens",
      href: "/characters",
      icon: <PersonStanding size={24} />,
    },
    { title: "Luta", href: "/fight", icon: <Swords size={24} /> },
  ];

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && querySearch.trim() !== "") {
      setQuerySearch("");
      router.push(`/search?query=${querySearch}`);
    }
  };

  return (
    <nav
      className={`bg-secondary sticky top-0 z-10 p-4 transition-transform duration-300 transform ${scrolling ? "-translate-y-full" : "translate-y-0"
        } `}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Link href={"/"}>
            <div className="flex-shrink-0 flex items-center gap-4">
              <Image
                src={Logo}
                width={50}
                height={50}
                alt="Imaginando Histórias"
                title="Imaginando Histórias"
              />
              <h1 className="font-bold text-light text-lg">
                Imaginando Histórias
              </h1>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  value={querySearch}
                  type="text"
                  onChange={(e) => setQuerySearch(e.target.value)}
                  onKeyDown={handleSearch}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Procurar Personagens..."
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link key={item.title} href={item.href} legacyBehavior>
                <button
                  className="text-light hover:bg-dark p-2 hover:text-light rounded-xl"
                  title={item.title}
                >
                  {item.icon}
                </button>
              </Link>
            ))}
          </div>
          <div className="mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`} />

              <CircleX
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3 flex flex-col">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              value={querySearch}
              type="text"
              onChange={(e) => setQuerySearch(e.target.value)}
              onKeyDown={handleSearch}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Procurar Personagens..."
            />
          </div>
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href} legacyBehavior>
              <a className="text-light px-3 py-2 my-2 flex rounded-md text-base font-medium hover:bg-gray-700">
                {item.icon}
                {item.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}


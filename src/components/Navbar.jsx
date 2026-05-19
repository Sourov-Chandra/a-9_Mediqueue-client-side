"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BsBoxArrowRight,
  BsCalendarCheck,
  BsCardList,
  BsHouse,
  BsList,
  BsPeople,
  BsPerson,
  BsPlusCircle,
  BsX,
} from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "@/lib/utils/auth-client";
import { useGlobals } from "@/providers/AppProvider";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useGlobals();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const isLoggedIn = !!session;
  const userEmail = session?.user?.email || null;

  const handleLogout = async () => {
    await signOut();
    setProfileOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <BsHouse size={18} />, private: false },
    {
      href: "/tutors",
      label: "Tutors",
      icon: <BsPeople size={18} />,
      private: false,
    },
    {
      href: "/add-tutor",
      label: "Add Tutor",
      icon: <BsPlusCircle size={18} />,
      private: true,
    },
    {
      href: "/my-tutors",
      label: "My Tutors",
      icon: <BsCardList size={18} />,
      private: true,
    },
    {
      href: "/my-bookings",
      label: "My Booked Sessions",
      icon: <BsCalendarCheck size={18} />,
      private: true,
    },
  ];

  const headerClass = `fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 transition-colors duration-200 ${
    isDark ? "bg-gray-900/90 border-gray-800" : "bg-white/90 border-gray-200"
  }`;

  if (isPending) {
    return (
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className={`flex items-center gap-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              📚 MediQueue
            </div>
            <div className="w-9 h-9"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`flex items-center gap-2 text-xl font-bold hover:opacity-80 transition ${isDark ? "text-white" : "text-gray-900"}`}
          >
            📚 MediQueue
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.private && !isLoggedIn) return null;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? isDark
                        ? "bg-sky-900/30 text-sky-400"
                        : "bg-sky-100 text-sky-600"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 p-1 rounded-full transition ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-sky-900/30 text-sky-400" : "bg-sky-100 text-sky-600"}`}
                  >
                    <BsPerson size={18} />
                  </div>
                </button>

                {profileOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 z-50 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                  >
                    <div
                      className={`px-4 py-2 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}
                    >
                      <p
                        className={`text-sm font-medium truncate ${isDark ? "text-gray-200" : "text-gray-700"}`}
                      >
                        {userEmail || "User"}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition ${isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"}`}
                    >
                      <BsBoxArrowRight size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className={`px-4 py-2 text-sm font-medium transition hover:text-sky-600 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md transition ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <BsX size={24} /> : <BsList size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden border-t px-4 py-4 space-y-3 shadow-lg transition-colors duration-200 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
        >
          {navLinks.map((link) => {
            if (link.private && !isLoggedIn) return null;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive
                    ? isDark
                      ? "bg-sky-900/30 text-sky-400"
                      : "bg-sky-100 text-sky-600"
                    : isDark
                      ? "text-gray-200 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
          <div
            className={`pt-3 border-t flex items-center justify-between ${isDark ? "border-gray-700" : "border-gray-200"}`}
          >
            <ThemeToggle />
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-md transition ${isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"}`}
              >
                <BsBoxArrowRight size={16} /> Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm font-medium text-sky-600 hover:underline"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

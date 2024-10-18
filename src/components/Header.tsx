import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from '../server/api/trpc';
import Link from 'next/link';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const searchMutation = trpc.mentors.search.useMutation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchMutation.mutateAsync(searchTerm);
    // Handle search results (e.g., update state, navigate to search results page)
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex-1 min-w-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search mentors"
            className="w-full px-4 py-2 border rounded-md"
          />
        </form>
        <div className="ml-4 flex items-center">
          {session ? (
            <>
              <Link href="/booking">
                <a className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                  Book session
                </a>
              </Link>
              <button onClick={() => signOut()} className="text-gray-600">
                Sign out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="text-blue-500">
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
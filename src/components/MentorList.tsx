import React from 'react';
import Link from 'next/link';

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

interface MentorListProps {
  mentors: Mentor[];
}

const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mentors.map((mentor) => (
        <Link key={mentor.id} href={`/mentor/${mentor.id}`}>
          <a className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.title}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MentorList;
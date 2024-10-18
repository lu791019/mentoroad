import React from 'react';

interface ProfileStrengthProps {
  strength: number;
}

const ProfileStrength: React.FC<ProfileStrengthProps> = ({ strength }) => {
  return (
    <div className="bg-purple-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Your profile strength</h2>
      <div className="flex items-center">
        <div className="w-full bg-purple-700 rounded-full h-2.5 mr-2">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${strength}%` }}></div>
        </div>
        <span>{strength}%</span>
      </div>
      <p className="mt-2">Padawan</p>
    </div>
  );
};

export default ProfileStrength;
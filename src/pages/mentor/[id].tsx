import React from 'react';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import Layout from '../../components/Layout';
import MentorServices from '../../components/MentorServices';

const MentorProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: mentor, isLoading } = trpc.mentors.getById.useQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (!mentor) return <div>Mentor not found</div>;

  return (
    <Layout>
      <div className="flex items-center mb-6">
        <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h1 className="text-3xl font-bold">{mentor.name}</h1>
          <p className="text-gray-600">{mentor.title}</p>
        </div>
      </div>
      <MentorServices services={mentor.services} mentorId={mentor.id} />
    </Layout>
  );
};

export default MentorProfile;
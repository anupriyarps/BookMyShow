import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, Star, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../componets/Loading';
import Title from '../../componets/admin/Title';
import BlurCircle from '../../componets/BlurCircle';
import dateFormate from '../../lib/dateFormate';

const Dashboard = () => {

    const currency = import.meta.env.VITE_CURRENCY;

    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        activeShows:[]
    });

    const [loading, setLoading] = useState(true);

    const dashboardCards = [
  {
    title: 'Total Users',
    value: dashboardData?.totalUsers ?? 0,
    icon: UsersIcon
  },
  {
    title: 'Total Bookings',
    value: dashboardData?.totalBookings ?? 0,
    icon: ChartLineIcon
  },
  {
    title: 'Total Revenue',
    value: `${currency}${dashboardData?.totalRevenue ?? 0}`,
    icon: CircleDollarSignIcon
  },
  {
    title: 'Active Shows',
    value: dashboardData?.activeShows?.length ?? 0,
    icon: PlayCircleIcon
  }
];

    const fetchDashboardData = async () => {
        setDashboardData(dummyDashboardData);
        setLoading(false);
    }
    useEffect(() => {
        fetchDashboardData();
    }, []);

  return !loading ? (
    <>
      <Title text1={'Admin'} text2={'Dashboard'} />

      <div className='relative flex flex-wrap gap-4 mt-6 max-w-5xl'>
        <BlurCircle top='-100px' left='0' />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardCards.map((card, index) => (
                <div
                key={index}
                className="flex items-center justify-between px-4 py-4 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
                >
                    <div>
                        <h1 className="text-sm">{card.title}</h1>
                        <p className="text-xl font-medium mt-1">{card.value}</p>
                    </div>
                    <card.icon className="w-8 h-8" />
                </div>
            ))}
        </div>
        </div>
        <p className='text-lg font-medium mt-10'>Active Shows</p>
        <div className='relative flex flex-wrap gap-4 mt-6 max-w-5xl'>
            <BlurCircle top='100px' left='-10%' />
            {dashboardData.activeShows.map((show) => (
                <div key={show._id} className='w-55 rounded-lg overflow-hidden h-full bp-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'>
                   <img src={show.movie.poster_path} alt={show.movie.title} className='w-full h-60 object-cover' />
                   <p className='font-medium p-2 truncate'>{show.movie.title}</p>
                   <div className='flex items-center justify-between px-2'>
                        <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
                        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                            <StarIcon className='w-4 h-4 text-primary fill-primary' />
                            {show.movie.vote_average.toFixed(1)}
                        </p>
                    </div>
                    <p className='px-2 pt-2 text-sm text-gray-400'>
                        {dateFormate(show.showDateTime)} </p>
                </div>
            ))}
         </div>
    </>
  ) : <Loading />;
}

export default Dashboard

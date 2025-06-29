'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard, { Blog as IBlog } from './blog-card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { personalData } from '@/utils/data/personal-data';
import { FiFileText } from 'react-icons/fi';

interface BlogProps {
  blogs: IBlog[];
}

const Blog: React.FC<BlogProps> = ({ }) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  async function getData(): Promise<IBlog[]> {
    const blogURL = `https://dev.to/api/articles?username=${personalData.devUsername}`;
    const res = await axios.get(blogURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    const data: IBlog[] = res.data;

    const filtered = data.filter((item: IBlog) => item?.cover_image).sort(() => Math.random() - 0.5);

    return filtered;
  }

  useEffect(() => {
    getData().then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div id='blogs' className="relative z-50 border-t my-12 lg:my-24 ">
      <div className="w-[100px] h-[100px] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="mb-20">
        <div className="w-[100px] h-[100px] bg-gradient-to-r from-[#0974f1]/30 to-blue-500/30 rounded-full absolute -top-4 left-0 translate-x-1/2 filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="flex items-center justify-start relative backdrop-blur-sm">
          <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] absolute left-0 w-fit text-white px-6 py-3 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <FiFileText className="w-5 h-5" />
            Blogs
          </span>
          <span className="w-full h-[2px] bg-gradient-to-r from-[#9fccfa] via-[#0974f1]/50 to-transparent ml-2"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.slice(0, 6).map((blog: IBlog, i: number) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>

      {blogs.length > 6 && (
        <div className="flex justify-center  mt-5 lg:mt-12">
          <Link
            className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-[#9fccfa] to-[#0974f1] to-[#0974f1] px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
            role="button"
            href="/blog"
          >
            <span>View More</span>
            <FaArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blog;
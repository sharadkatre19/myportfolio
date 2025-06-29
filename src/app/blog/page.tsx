'use client';

import { personalData } from "@/utils/data/personal-data";
import BlogCard, { Blog } from "../components/homepage/blog/blog-card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiFileText } from "react-icons/fi";

export default function Page(): React.ReactNode {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function getData(): Promise<Blog[]> {
    const blogURL = `https://dev.to/api/articles?username=${personalData.devUsername}`;
    const res = await axios.get(blogURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    const data: Blog[] = res.data;
    console.log("🚀 ~ data:", data);
    return data;
  }

  useEffect(() => {
    getData()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[2px] bg-[#0974f1]"></span>
            <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] w-fit text-white p-2 px-5 text-2xl rounded-md">
              All Blog
            </span>
            <span className="w-24 h-[2px] bg-[#0974f1]"></span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-lg">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[2px] bg-[#0974f1]"></span>
            <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] w-fit text-white p-2 px-5 text-2xl rounded-md">
              All Blog
            </span>
            <span className="w-24 h-[2px] bg-[#0974f1]"></span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-red-500 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Back to Home Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0974f1] text-white rounded-md hover:bg-[#0869d9] transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center w-full px-4">
          <span className="flex-1 h-[2px] bg-gradient-to-l from-[#9fccfa] via-[#0974f1]/50 to-transparent"></span>
          <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] w-fit text-white p-2 px-5 text-xl rounded-md flex items-center gap-2">
            <FiFileText className="w-5 h-5" />
            All Blogs
          </span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-[#9fccfa] via-[#0974f1]/50 to-transparent"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.map((blog: Blog, i: number) => (
          blog?.cover_image && <BlogCard blog={blog} key={i} />
        ))}
      </div>
    </div>
  );
}
'use client';
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { JSX, useState } from 'react';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow, FaCopy, FaCheck } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

interface ContactMethod {
  icon: JSX.Element;
  label: string;
  value: string;
  href: string;
  copyable: boolean;
  id: string;
}

interface SocialLink {
  icon: JSX.Element;
  href: string;
  label: string;
  hoverColor: string;
}

const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: <MdAlternateEmail className="text-xl" />,
      label: "Email",
      value: personalData.email,
      href: `mailto:${personalData.email}`,
      copyable: true,
      id: 'email'
    },
    {
      icon: <IoMdCall className="text-xl" />,
      label: "Phone",
      value: personalData.phone,
      href: `tel:${personalData.phone}`,
      copyable: true,
      id: 'phone'
    },
    {
      icon: <CiLocationOn className="text-xl" />,
      label: "Location",
      value: personalData.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalData.address)}`,
      copyable: true,
      id: 'address'
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <IoLogoGithub className="text-xl" />,
      href: personalData.github,
      label: "GitHub",
      hoverColor: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      icon: <BiLogoLinkedin className="text-xl" />,
      href: personalData.linkedIn,
      label: "LinkedIn",
      hoverColor: "hover:text-blue-600"
    },
    {
      icon: <FaXTwitter className="text-xl" />,
      href: personalData.twitter,
      label: "Twitter",
      hoverColor: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      icon: <FaStackOverflow className="text-xl" />,
      href: personalData.stackOverflow,
      label: "Stack Overflow",
      hoverColor: "hover:text-orange-500"
    },
    {
      icon: <FaFacebook className="text-xl" />,
      href: personalData.facebook,
      label: "Facebook",
      hoverColor: "hover:text-blue-500"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I&apos;d love to hear from you. Send me a message or reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <div
                    key={method.id}
                    className="group flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {method.label}
                        </p>
                        <Link
                          href={method.href}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                          target={method.id === 'address' ? '_blank' : undefined}
                          rel={method.id === 'address' ? 'noopener noreferrer' : undefined}
                        >
                          {method.value}
                        </Link>
                      </div>
                    </div>
                    {method.copyable && (
                      <button
                        onClick={() => copyToClipboard(method.value, method.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        title={`Copy ${method.label}`}
                        aria-label={`Copy ${method.label}`}
                      >
                        {copiedField === method.id ? (
                          <FaCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaCopy className="text-gray-500 dark:text-gray-400 text-sm" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 transition-all duration-200 hover:scale-110 hover:shadow-lg ${social.hoverColor}`}
                    title={social.label}
                    aria-label={`Visit my ${social.label} profile`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <IoMdCall className="text-sm" />
                </div>
                <div>
                  <h4 className="font-semibold">Quick Response</h4>
                  <p className="text-sm opacity-90">I typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            <ContactForm />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Ready to start a conversation?{' '}
            <a
              href={`mailto:${personalData.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Drop me a line
            </a>{' '}
            and let&apos;s discuss your next project.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;
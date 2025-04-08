import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Learn',
      links: [
        { name: 'Speaking', href: '/learn/speaking/speak-1' },
        { name: 'Writing', href: '/learn/writing/write-1' },
        { name: 'Reading', href: '/learn/reading/read-1' },
        { name: 'Grammar', href: '/learn/grammar/gram-1' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Forums', href: '/community/forums' },
        { name: 'Study Groups', href: '/community/groups' },
        { name: 'Language Exchange', href: '/community/exchange' },
        { name: 'Progress Tracking', href: '/community/progress' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Study Guide', href: '/resources/guide' },
        { name: 'Dictionary', href: '/resources/dictionary' },
        { name: 'Kanji Reference', href: '/resources/kanji' },
        { name: 'Grammar Library', href: '/resources/grammar' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Method', href: '/about/method' },
        { name: 'Contact Us', href: '/about/contact' },
        { name: 'Privacy Policy', href: '/about/privacy' },
        { name: 'Terms of Service', href: '/about/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                        whileHover={{ x: 3 }}
                        transition={{ type: 'tween' }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
              >
                JapLearn
              </motion.span>
              <span className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ y: -2 }}
              >
                𝕏
              </motion.a>
              <motion.a 
                href="https://discord.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ y: -2 }}
              >
                Discord
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ y: -2 }}
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
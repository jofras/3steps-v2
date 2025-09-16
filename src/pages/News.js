// News.js

import SectionBlock from '../components/SectionBlock';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';

export default function News() {
  return (
    <SectionBlock title="News" bg="white">
      <div className="space-y-6">
        {newsItems.map((post, i) => (
          <div key={i} className="p-4 rounded shadow bg-background">
            <Link to={`/multimedia/news/${post.slug}`} className="font-heading text-xl text-primary hover:underline font-bold">
              {post.title}
            </Link>
            <div className="text-sm text-gray-500 mb-2">{post.date}</div>
            <div className="text-textdark">{post.excerpt}</div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
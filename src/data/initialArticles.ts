import { Article } from '../types';

export const initialArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    url: 'https://example.com/ai-future',
    description: 'An in-depth look at how AI will shape our world in the coming years.',
    votes: 42,
    author: 'TechVisionary',
    timestamp: new Date('2024-03-10T10:00:00'),
    commentCount: 2,
    comments: [
      {
        id: '1',
        articleId: '1',
        author: 'AIEnthusiast',
        content: 'Great article! The potential applications in healthcare are particularly exciting.',
        timestamp: new Date('2024-03-10T12:00:00'),
        votes: 5
      },
      {
        id: '2',
        articleId: '1',
        author: 'FuturistDev',
        content: 'I wonder how this will affect software development in the next few years.',
        timestamp: new Date('2024-03-10T13:30:00'),
        votes: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Breakthrough in Quantum Computing',
    url: 'https://example.com/quantum-breakthrough',
    description: 'Scientists achieve new milestone in quantum computing research.',
    votes: 38,
    author: 'QuantumPioneer',
    timestamp: new Date('2024-03-09T15:30:00'),
    commentCount: 1,
    comments: [
      {
        id: '3',
        articleId: '2',
        author: 'QuantumEnthusiast',
        content: 'This could revolutionize cryptography as we know it!',
        timestamp: new Date('2024-03-09T16:45:00'),
        votes: 7
      }
    ]
  }
];
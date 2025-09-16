export const quizData = {
  title: "General Knowledge Quiz",
  description: "Test your knowledge with these 10 questions covering various topics!",
  timeLimit: 300, // 5 minutes in seconds
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      explanation: "Paris is the capital and most populous city of France."
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface."
    },
    {
      id: 3,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: 1,
      explanation: "The Blue Whale is the largest mammal and the largest animal ever known to have lived on Earth."
    },
    {
      id: 4,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      explanation: "World War II ended in 1945 with the surrender of Japan in September."
    },
    {
      id: 5,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'."
    },
    {
      id: 6,
      question: "Which ocean is the largest?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
    },
    {
      id: 8,
      question: "What is the smallest unit of matter?",
      options: ["Molecule", "Atom", "Electron", "Proton"],
      correctAnswer: 1,
      explanation: "An atom is the smallest unit of ordinary matter that forms a chemical element."
    },
    {
      id: 9,
      question: "Which country has the most natural lakes?",
      options: ["Russia", "United States", "Canada", "Finland"],
      correctAnswer: 2,
      explanation: "Canada has the most natural lakes in the world, with over 2 million lakes."
    },
    {
      id: 10,
      question: "What is the fastest land animal?",
      options: ["Lion", "Cheetah", "Leopard", "Gazelle"],
      correctAnswer: 1,
      explanation: "The Cheetah is the fastest land animal, capable of reaching speeds up to 70 mph."
    }
  ]
};

export const quizCategories = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '🧠',
    description: 'Test your overall knowledge',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'science',
    name: 'Science & Nature',
    icon: '🔬',
    description: 'Explore the world of science',
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'history',
    name: 'History',
    icon: '📚',
    description: 'Journey through time',
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    description: 'Test your sports knowledge',
    color: 'from-yellow-400 to-orange-500'
  }
];
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  Brain,
  ArrowRight,
  ArrowLeft,
  Home
} from 'lucide-react';
import { quizData } from './QuizData';
import Layout from '../layout';

const QuizApi = ({ onBack }) => {

  const url = ["https://cube.brainiacc.com"];
  const accessToken  = '3333';


  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken || ""}`,
  };


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // Default 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [apiQuizData, setApiQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch quiz data from API
  const fetchQuizData = async () => {
    if (!url || !headers) {
      setError('Authentication not ready');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/quiz`, {
        method: 'GET',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz data: ${response.status}`);
      }

      const data = await response.json();
      
      const transformedData = {
        title: "QPlay Knowledge Quiz",
        description: "Test your knowledge about QPlay and insurance!",
        timeLimit: 60, // 1 minute
        questions: data.map((item) => {
          // Convert answer letter to index (A=0, B=1, C=2, D=3)
          const answerMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
          const correctAnswerIndex = answerMap[item.answers.toUpperCase()];
          
          return {
            id: item.id,
            question: item.question,
            options: [
              item.option_a,
              item.option_b,
              item.option_c,
              item.option_d
            ],
            correctAnswer: correctAnswerIndex,
            explanation: `The correct answer is "${item.correct_answer}"`
          };
        })
      };

      setApiQuizData(transformedData);
      setTimeLeft(transformedData.timeLimit);
      
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const getQuizData = () => apiQuizData || quizData;

  const handleNextQuestion = () => {
    const currentQuizData = getQuizData();
    if (currentQuestion < currentQuizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuizComplete = () => {
    const currentQuizData = getQuizData();
    const correctAnswers = currentQuizData.questions.reduce((acc, question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        acc++;
      }
      return acc;
    }, 0);
    
    setScore(correctAnswers);
    setQuizCompleted(true);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    const currentQuizData = getQuizData();
    setTimeLeft(currentQuizData.timeLimit);
    setQuizStarted(false);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const currentQuizData = getQuizData();
    const percentage = (score / currentQuizData.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const currentQuizData = getQuizData();
    const percentage = (score / currentQuizData.questions.length) * 100;
    if (percentage >= 90) return 'Outstanding! 🏆';
    if (percentage >= 80) return 'Excellent work! 🌟';
    if (percentage >= 70) return 'Great job! 👏';
    if (percentage >= 60) return 'Good effort! 👍';
    if (percentage >= 50) return 'Not bad! 📚';
    return 'Keep practicing! 💪';
  };

  if (!quizStarted) {
    return (
      <Layout>
        <div className="min-h-screen p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center"
          >
            <div className="text-6xl mb-6">🧠</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{getQuizData().title}</h1>
            <p className="text-gray-600 text-lg mb-8">{getQuizData().description}</p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-semibold text-gray-800">
                  10 Questions
                </div>
                <div className="text-sm text-gray-600">Multiple choice</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="font-semibold text-gray-800">
                  {Math.floor(getQuizData().timeLimit / 60)} Minutes
                </div>
                <div className="text-sm text-gray-600">Time limit</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-gray-800">Score & Review</div>
                <div className="text-sm text-gray-600">Detailed results</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  if (!apiQuizData && !error) {
                    await fetchQuizData();
                  }
                  if (!error) {
                    setQuizStarted(true);
                    setTimeLeft(getQuizData().timeLimit);
                  }
                }}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Brain className="w-5 h-5" />
                {loading ? 'Loading Quiz...' : 'Start Quiz'}
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      </Layout>
    );
  }

  if (showResults) {
    return (
      <Layout>
        <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {(score / getQuizData().questions.length) * 100 >= 80 ? '🏆' : 
                 (score / getQuizData().questions.length) * 100 >= 60 ? '🎉' : '📚'}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className={`text-3xl font-bold ${getScoreColor()} mb-1`}>
                    {score}/{getQuizData().questions.length}
                  </div>
                  <div className="text-sm text-blue-800">Correct Answers</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className={`text-3xl font-bold ${getScoreColor()} mb-1`}>
                    {Math.round((score / getQuizData().questions.length) * 100)}%
                  </div>
                  <div className="text-sm text-green-800">Accuracy</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {formatTime(getQuizData().timeLimit - timeLeft)}
                  </div>
                  <div className="text-sm text-purple-800">Time Taken</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Answers</h2>
              <div className="space-y-6">
                {getQuizData().questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <XCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-3">
                            {index + 1}. {question.question}
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                  optionIndex === question.correctAnswer
                                    ? 'border-green-400 bg-green-100 text-green-800'
                                    : optionIndex === userAnswer && !isCorrect
                                    ? 'border-red-400 bg-red-100 text-red-800'
                                    : 'border-gray-200 bg-white text-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {optionIndex === question.correctAnswer && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className="text-sm font-medium">{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Menu
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      </Layout>
    );
  }

  const currentQuizData = getQuizData();
  const question = currentQuizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuizData.questions.length) * 100;

  return (
    <Layout>
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {currentQuizData.questions.length}
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft <= 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {question.question}
            </h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswers[question.id] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[question.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[question.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[question.id] === undefined}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentQuestion === currentQuizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </Layout>
  );
};

export default QuizApi;
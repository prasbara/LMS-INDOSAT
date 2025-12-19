import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CircleCheck,
  CircleX,
  Clock,
  ArrowLeft,
  Trophy,
  CircleAlert,
} from 'lucide-react';
import { useApp, QuizResult } from '../../context/AppContext';

interface QuizComponentProps {
  moduleId: string;
  onComplete: () => void;
  onBack: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  moduleId,
  onComplete,
  onBack,
}) => {
  const { quizzes, currentUser, addQuizResult } = useApp();
  const quiz = quizzes.find((q) => q.moduleId === moduleId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults]);

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <CircleAlert size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No quiz available for this module</p>
        <button
          onClick={onBack}
          className="mt-4 text-[#DC1F2E] hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Save quiz result
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      quizId: quiz.id,
      userId: currentUser?.id || '',
      score,
      answers: selectedAnswers,
      completedAt: new Date().toISOString(),
      passed,
    };

    addQuizResult(result);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {passed ? (
              <Trophy size={80} className="mx-auto text-[#FFC600] mb-4" />
            ) : (
              <CircleAlert size={80} className="mx-auto text-orange-500 mb-4" />
            )}
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {passed ? 'Congratulations! 🎉' : 'Keep Trying!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {passed
              ? 'You passed the quiz!'
              : `You need ${quiz.passingScore}% to pass. Your score: ${score}%`}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-800">{score}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-800">
                {selectedAnswers.filter((ans, i) => ans === quiz.questions[i].correctAnswer).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-800">{quiz.questions.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>

          {/* Review Answers */}
          <div className="text-left mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-4 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CircleCheck size={20} className="text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <CircleX size={20} className="text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <p className="font-medium text-gray-800">{question.question}</p>
                    </div>

                    <div className="ml-8 space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Your answer: </span>
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {question.options[userAnswer] || 'Not answered'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-sm">
                          <span className="text-gray-600">Correct answer: </span>
                          <span className="text-green-600">
                            {question.options[question.correctAnswer]}
                          </span>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="text-sm text-gray-700 mt-2 p-2 bg-white rounded">
                          <span className="font-medium">Explanation: </span>
                          {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={onComplete}
            className="bg-[#DC1F2E] text-white px-8 py-3 rounded-lg hover:bg-[#b81826] transition-colors"
          >
            Continue Learning
          </button>
        </div>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#DC1F2E] transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {quiz.timeLimit && (
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={20} />
            <span className={`font-semibold ${timeLeft < 60 ? 'text-red-600' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-[#DC1F2E] h-2 rounded-full transition-all"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl p-8 shadow-sm"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-[#DC1F2E] bg-red-50'
                    : 'border-gray-200 hover:border-[#DC1F2E] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-[#DC1F2E] bg-[#DC1F2E]'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <CircleCheck size={16} className="text-white" />
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {selectedAnswers.filter((a) => a !== undefined).length} / {quiz.questions.length}{' '}
          answered
        </div>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 rounded-lg bg-[#DC1F2E] text-white hover:bg-[#b81826] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.filter((a) => a !== undefined).length !== quiz.questions.length}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};
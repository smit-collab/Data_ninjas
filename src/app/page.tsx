'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock data for exoplanets with expanded quiz questions
const exoplanets = [
  {
    id: 1,
    name: "Kepler-16b",
    image: "https://www.nasa.gov/wp-content/uploads/2023/03/587854main_Kepler16_planetpov_art_full.jpg",
    questions: [
      {
        question: "Which type of star system is Kepler-16b in?",
        options: ["Single star", "Binary star", "Triple star", "Rogue planet"],
        answer: "Binary star"
      },
      {
        question: "What is Kepler-16b often nicknamed?",
        options: ["Tatooine", "Hoth", "Endor", "Alderaan"],
        answer: "Tatooine"
      },
      {
        question: "What is the approximate mass of Kepler-16b compared to Jupiter?",
        options: ["0.3 times", "0.5 times", "1 time", "2 times"],
        answer: "0.3 times"
      },
      {
        question: "In what year was Kepler-16b discovered?",
        options: ["2009", "2011", "2013", "2015"],
        answer: "2011"
      }
    ]
  },
  {
    id: 2,
    name: "HD 189733 b",
    image: "https://assets.newatlas.com/dims4/default/201a9d3/2147483647/strip/true/crop/963x642+77+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fhd-189733b-exoplanet-color-first-measurement-hubble.jpg",
    questions: [
      {
        question: "What is the most notable feature of HD 189733 b's atmosphere?",
        options: ["Methane", "Water vapor", "Carbon dioxide", "Silicate clouds"],
        answer: "Silicate clouds"
      },
      {
        question: "What is the estimated surface temperature of HD 189733 b?",
        options: ["500°C", "1000°C", "1500°C", "2000°C"],
        answer: "1000°C"
      },
      {
        question: "What type of exoplanet is HD 189733 b?",
        options: ["Super-Earth", "Mini-Neptune", "Hot Jupiter", "Ice Giant"],
        answer: "Hot Jupiter"
      },
      {
        question: "What color does HD 189733 b appear to be?",
        options: ["Red", "Blue", "Green", "White"],
        answer: "Blue"
      }
    ]
  },
  {
    id: 3,
    name: "TRAPPIST-1e",
    image: "https://www.universetoday.com/wp-content/uploads/2018/05/TRAPPIST-1e_Artists_Impression-e1555184830466.png",
    questions: [
      {
        question: "How many planets are in the TRAPPIST-1 system?",
        options: ["5", "6", "7", "8"],
        answer: "7"
      },
      {
        question: "What type of star is TRAPPIST-1?",
        options: ["Red dwarf", "Yellow dwarf", "White dwarf", "Blue giant"],
        answer: "Red dwarf"
      },
      {
        question: "Which zone is TRAPPIST-1e located in?",
        options: ["Hot zone", "Warm zone", "Habitable zone", "Cold zone"],
        answer: "Habitable zone"
      },
      {
        question: "Approximately how long is a year on TRAPPIST-1e?",
        options: ["6 Earth days", "12 Earth days", "24 Earth days", "365 Earth days"],
        answer: "6 Earth days"
      }
    ]
  }
];

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof exoplanets[0] | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExploration, setShowExploration] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0); // Add score state

  const startExploring = () => {
    // Change the background image
    document.body.style.backgroundImage = "url('https://cdn.mos.cms.futurecdn.net/HuGGeENt6kGyixe3hT9tnY.jpg')";
    
    setShowExploration(true);
  };

  const startQuiz = (planet: typeof exoplanets[0]) => {
    setSelectedPlanet(planet);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (selectedPlanet) {
      const currentQuestion = selectedPlanet.questions[currentQuestionIndex];
      setIsCorrect(answer === currentQuestion.answer);
      if (answer === currentQuestion.answer) {
        setScore(score + 1); // Increment score for correct answer
      }
    }
  };

  const nextQuestion = () => {
    if (selectedPlanet && currentQuestionIndex < selectedPlanet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Quiz finished
      setQuizStarted(false);
      setSelectedPlanet(null);
      // Optionally, you can display the score here
      alert(`Your score: ${score} out of ${selectedPlanet.questions.length}`); // Display score
      setScore(0); // Reset score for next quiz
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 p-8 md:p-24 text-white max-w-4xl w-full">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 text-center text-blue-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Exoplanet Adventure
        </motion.h1>
        {!showExploration ? (
          <motion.div 
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              id="startExploringButton" // Add an ID here
              onClick={startExploring}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full w-64 transition-all duration-300 transform hover:scale-105"
            >
              Start Exploring
            </button>
            <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded-full w-64 transition-all duration-300 transform hover:scale-105">
              Resources
            </button>
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-full w-64 transition-all duration-300 transform hover:scale-105">
              Leaderboard
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-full w-64 transition-all duration-300 transform hover:scale-105">
              Settings
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-200">Choose an Exoplanet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {exoplanets.map((planet) => (
                <motion.div 
                  key={planet.id} 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={planet.image}
                    alt={planet.name}
                    width={200}
                    height={200}
                    className="rounded-full cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
                    onClick={() => startQuiz(planet)}
                  />
                  <p className="mt-2 font-semibold text-lg text-blue-100">{planet.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {quizStarted && selectedPlanet && (
          <motion.div 
            className="mt-8 p-6 bg-gray-800 bg-opacity-80 rounded-lg w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4"> {/* Flex container for title and score */}
              <h2 className="text-2xl md:text-3xl font-bold text-blue-300">Quiz: {selectedPlanet.name}</h2>
              <p className="text-blue-100">Score: {score}/{selectedPlanet.questions.length}</p> {/* Display score here */}
            </div>
            <p className="text-blue-100 mb-4">{selectedPlanet.questions[currentQuestionIndex].question}</p>
            <div className="space-y-2">
              {selectedPlanet.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-2 rounded ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-blue-500 hover:bg-blue-400'
                  } transition-colors`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <div className="mt-4">
                <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-2 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
                >
                  Next Question
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
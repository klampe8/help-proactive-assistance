import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  ActionButton,
} from "@react-spectrum/s2";
import { IconAiChat } from "./assets/svgs/iconAiChat";
import Close from "@react-spectrum/s2/icons/Close";
import ThumbUp from "@react-spectrum/s2/icons/ThumbUp";
import ThumbDown from "@react-spectrum/s2/icons/ThumbDown";
import "./AISummaryPrototype.css";

interface Question {
  id: string;
  text: string;
  answer: string;
  steps?: Array<{ text: string }>;
  relatedSections?: string[];
}

interface SummaryLink {
  text: string;
  href: string;
}

interface AISummaryPrototypeProps {
  summaryText?: string;
  summaryLinks?: SummaryLink[];
  questions?: Question[];
}

// Default data for standalone usage
const defaultSummaryText = "Fix common Acrobat printing errors quickly so you can print documents without unexpected failures. Learn about:";
const defaultSummaryLinks: SummaryLink[] = [
  { text: "Which printer settings, drivers, and Acrobat preferences commonly cause errors", href: "#printer-settings" },
  { text: "How to check the print queue", href: "#print-queue" },
  { text: "Step by step fixes to get a successful print job", href: "#fixes" }
];

const defaultQuestions: Question[] = [
  {
    id: "q1",
    text: "Why does Acrobat fail to print a document?",
    answer:
      "Acrobat can fail to print due to issues with the PDF file itself (like corruption), problems with the printer (like outdated drivers or connection issues), or software-related conflicts (like corrupted Acrobat preferences or security settings).",
  },
  {
    id: "q2",
    text: "How do I clear a stuck print job on my computer?",
    answer: "To clear a stuck print job:",
    steps: [
      { text: "Open your printer queue (Windows: Settings > Devices > Printers, Mac: System Preferences > Printers)" },
      { text: "Right-click the stuck job and select 'Cancel'" },
      { text: "If it won't cancel, restart the Print Spooler service (Windows) or reset the printing system (Mac)" },
      { text: "Turn your printer off and on again to clear its memory" }
    ],
  },
  {
    id: "q3",
    text: "Which printer driver should I use with Acrobat?",
    answer:
      "Always use the latest printer driver from your printer manufacturer's website. Visit the support section, search for your exact printer model, and download the most recent driver.",
  },
];

const AISummaryPrototype: React.FC<AISummaryPrototypeProps> = ({ 
  summaryText = defaultSummaryText,
  summaryLinks = defaultSummaryLinks,
  questions = defaultQuestions
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate loading and entrance animation
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(true);
      setHasAnimatedIn(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Handle sticky behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0 && !isMinimized);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMinimized]);

  const toggleQuestion = (id: string) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
      setFeedback(null); // Reset feedback when opening a new question
    }
    setHasInteracted(true);
  };

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(type);
  };

  const handleClose = () => {
    setIsMinimized(true);
    setIsVisible(false);
  };

  const handleReopen = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  // Reset state when questions change (when switching articles)
  useEffect(() => {
    setExpandedQuestion(null);
    setFeedback(null);
    setHasInteracted(false);
  }, [questions]);

  const displayedQuestions = questions.slice(0, 3);
  const expandedQuestionData = expandedQuestion ? questions.find(q => q.id === expandedQuestion) : null;

  if (isMinimized) {
    return (
      <div className="floating-button-container">
        <Button variant="accent" onPress={handleReopen} UNSAFE_className="floating-button">
          <IconAiChat />
          View AI summary
        </Button>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`ai-summary-container ${hasAnimatedIn ? 'animated-in' : ''} ${isSticky ? 'sticky' : ''}`}
    >
      <div className="ai-summary-card">
        {/* Gradient border animation */}
        <div className="gradient-border" />

        {/* Header */}
        <div className="ai-summary-header">
          <div className="ai-summary-header-left">
            <div className={isLoading ? "icon-shimmer" : ""}>
              <IconAiChat />
            </div>
            <span className="ai-summary-title">Your AI summary</span>
          </div>
          <ActionButton isQuiet onPress={handleClose} UNSAFE_className="close-button">
            <Close />
          </ActionButton>
        </div>

        {/* Summary content */}
        <div className="summary-content">
          {isLoading ? (
            <div>
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line-short" />
            </div>
          ) : (
            <div>
              <p className="summary-text">{summaryText}</p>
              <ul className="summary-links">
                {summaryLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} onClick={() => setHasInteracted(true)}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Questions section */}
        {!isLoading && (
          <>
            <div className="questions-label">Relevant questions:</div>

            <div className="questions-list">
              {displayedQuestions.map((question, index) => {
                const isExpanded = expandedQuestion === question.id;

                return (
                  <div
                    key={question.id}
                    className="question-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className={`question-button ${isExpanded ? 'expanded' : ''}`}
                    >
                      <div className="icon-container">
                        <IconAiChat />
                      </div>
                      <span className="question-text">{question.text}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Expanded answer section */}
            {expandedQuestionData && (
              <div className="answer-container expanded">
                <div className="answer-header">
                  <p className="answer-text">{expandedQuestionData.answer}</p>
                  {expandedQuestionData.steps && (
                    <ol className="answer-steps">
                      {expandedQuestionData.steps.map((step, index) => (
                        <li key={index}>{step.text}</li>
                      ))}
                    </ol>
                  )}
                  <ActionButton
                    isQuiet
                    onPress={() => setExpandedQuestion(null)}
                    UNSAFE_className="close-answer-btn"
                    aria-label="Close answer"
                  >
                    <Close />
                  </ActionButton>
                </div>
              </div>
            )}

            {/* Feedback section at the bottom of the container - only show after interaction */}
            {hasInteracted && (
              <div className="summary-feedback-section">
                <div className="feedback-section">
                  <span className="feedback-label">Was this helpful?</span>
                  <ActionButton
                    isQuiet
                    onPress={() => handleFeedback("up")}
                    UNSAFE_className={`feedback-btn ${feedback === "up" ? "positive" : ""}`}
                  >
                    <ThumbUp />
                  </ActionButton>
                  <ActionButton
                    isQuiet
                    onPress={() => handleFeedback("down")}
                    UNSAFE_className={`feedback-btn ${feedback === "down" ? "negative" : ""}`}
                  >
                    <ThumbDown />
                  </ActionButton>
                </div>

                {feedback && (
                  <div className="feedback-message">
                    <p className="feedback-message-text">
                      Thank you for your feedback! This helps us improve our AI
                      assistance.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AISummaryPrototype;

import React, { useState, useRef, useEffect } from "react";
import {
  Provider,
  Button,
  ActionButton,
  Tooltip,
  TooltipTrigger,
} from "@react-spectrum/s2";
import { IconAiChat } from "./assets/svgs/iconAiChat";
import Close from "@react-spectrum/s2/icons/Close";
import ThumbUp from "@react-spectrum/s2/icons/ThumbUp";
import ThumbDown from "@react-spectrum/s2/icons/ThumbDown";
import Copy from "@react-spectrum/s2/icons/Copy";
import Share from "@react-spectrum/s2/icons/Share";
import Email from "@react-spectrum/s2/icons/Email";
import "./AISummaryPrototype.css";

interface Question {
  id: string;
  text: string;
  answer: string;
  relatedSections?: string[];
}

const questions: Question[] = [
  {
    id: "q1",
    text: "Why does Acrobat fail to print a document?",
    answer:
      "Acrobat can fail to print due to issues with the PDF file itself (like corruption), problems with the printer (like outdated drivers or connection issues), or software-related conflicts (like corrupted Acrobat preferences or security settings). Common solutions include checking the printer connection, updating drivers, and trying to print the PDF as an image, which bypasses complex rendering problems.",
    relatedSections: ["#printer-connection", "#corrupt-pdf"],
  },
  {
    id: "q2",
    text: "How do I clear a stuck print job on my computer?",
    answer:
      "To clear a stuck print job: 1) Open your printer queue (Windows: Settings > Devices > Printers, Mac: System Preferences > Printers), 2) Right-click the stuck job and select 'Cancel', 3) If it won't cancel, restart the Print Spooler service (Windows) or reset the printing system (Mac), 4) Turn your printer off and on again to clear its memory.",
    relatedSections: ["#printer-hardware"],
  },
  {
    id: "q3",
    text: "Which printer driver should I use with Acrobat?",
    answer:
      "Always use the latest printer driver from your printer manufacturer's website. Visit the support section, search for your exact printer model, and download the most recent driver. After installation, restart your computer. Avoid using generic or Windows-provided drivers as they may lack features needed for proper PDF printing.",
    relatedSections: ["#outdated-drivers"],
  },
  {
    id: "q4",
    text: "How do I print a PDF as an image to avoid errors?",
    answer:
      "To print as an image: 1) Open the PDF in Acrobat, 2) Click Print, 3) In the Print dialog, click 'Advanced', 4) Check 'Print as Image', 5) Click OK and then Print. This method bypasses complex rendering and often resolves printing issues with problematic PDFs.",
    relatedSections: ["#print-as-image"],
  },
  {
    id: "q5",
    text: "What Acrobat settings cause printing problems?",
    answer:
      "Common problematic settings include: Enhanced security settings blocking printer access, incorrect page scaling options, color management conflicts, and corrupted preferences files. Try resetting Acrobat preferences by holding Ctrl+Alt (Windows) or Cmd+Option (Mac) while launching Acrobat.",
    relatedSections: ["#acrobat-preferences"],
  },
];

const AISummaryPrototype: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [feedback, setFeedback] = useState<{ [key: string]: "up" | "down" | null }>({});
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
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
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleFeedback = (questionId: string, type: "up" | "down") => {
    setFeedback({ ...feedback, [questionId]: type });
  };

  const copyAnswer = async (answer: string, questionId: string) => {
    await navigator.clipboard.writeText(answer);
    setCopiedAnswer(questionId);
    setTimeout(() => setCopiedAnswer(null), 2000);
  };

  const handleClose = () => {
    setIsMinimized(true);
    setIsVisible(false);
  };

  const handleReopen = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  const displayedQuestions = showAllQuestions ? questions : questions.slice(0, 3);

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
            <p className="summary-text">
              Fix common Acrobat printing errors quickly so you can print documents
              without unexpected failures.{" "}
              <a href="#printer-settings">
                Learn which printer settings, drivers, and Acrobat preferences
                commonly cause errors
              </a>
              , how to{" "}
              <a href="#print-queue">check the print queue</a>, and{" "}
              <a href="#fixes">
                step by step fixes to get a successful print job
              </a>
              .
            </p>
          )}
        </div>

        {/* Questions section */}
        {!isLoading && (
          <>
            <div className="questions-label">Relevant questions:</div>

            <div className="questions-list">
              {displayedQuestions.map((question, index) => {
                const isExpanded = expandedQuestions.has(question.id);

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

            {/* Expanded answer section - shows below all chips */}
            {Array.from(expandedQuestions).map((questionId) => {
              const question = questions.find((q) => q.id === questionId);
              if (!question) return null;
              const questionFeedback = feedback[questionId];

              return (
                <div key={questionId} className="answer-container expanded">
                  <p className="answer-text">{question.answer}</p>

                  {/* Action buttons */}
                  <div className="action-buttons">
                    <TooltipTrigger>
                      <ActionButton
                        isQuiet
                        onPress={() => copyAnswer(question.answer, questionId)}
                        UNSAFE_className="action-btn"
                      >
                        <Copy />
                        {copiedAnswer === questionId ? "Copied!" : "Copy"}
                      </ActionButton>
                      <Tooltip>Copy answer to clipboard</Tooltip>
                    </TooltipTrigger>

                    <TooltipTrigger>
                      <ActionButton isQuiet UNSAFE_className="action-btn">
                        <Share />
                        Share
                      </ActionButton>
                      <Tooltip>Share this solution</Tooltip>
                    </TooltipTrigger>

                    <TooltipTrigger>
                      <ActionButton isQuiet UNSAFE_className="action-btn">
                        <Email />
                        Email
                      </ActionButton>
                      <Tooltip>Email to me</Tooltip>
                    </TooltipTrigger>

                    <div className="feedback-section">
                      <span className="feedback-label">Was this helpful?</span>
                      <ActionButton
                        isQuiet
                        onPress={() => handleFeedback(questionId, "up")}
                        UNSAFE_className={`feedback-btn ${questionFeedback === "up" ? "positive" : ""}`}
                      >
                        <ThumbUp />
                      </ActionButton>
                      <ActionButton
                        isQuiet
                        onPress={() => handleFeedback(questionId, "down")}
                        UNSAFE_className={`feedback-btn ${questionFeedback === "down" ? "negative" : ""}`}
                      >
                        <ThumbDown />
                      </ActionButton>
                    </div>
                  </div>

                  {questionFeedback && (
                    <div className="feedback-message">
                      <p className="feedback-message-text">
                        Thank you for your feedback! This helps us improve our AI
                        assistance.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Show more questions */}
            {!showAllQuestions && questions.length > 3 && (
              <button
                onClick={() => setShowAllQuestions(true)}
                className="show-more-btn"
              >
                Show {questions.length - 3} more questions
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AISummaryPrototype;

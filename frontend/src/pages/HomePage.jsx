import React, { useState, useEffect } from 'react';
import { Code, TimerReset } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import axios from 'axios';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import toast, { Toaster } from 'react-hot-toast';



const HomePage = () => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [review]);

  const handleReview = async () => {
    if (!code) {
      toast.error("Please paste your code before requesting a review.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/review', { code });
      setReview(response.data.review || "No review received.");
      toast.success("Reviewed successfully!");
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8 transition-colors duration-200">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Code Review Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Paste your code and get instant, AI-powered feedback</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col h-[500px] border border-transparent dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Your Code</h2>
            <textarea
              spellCheck="false"
              className="flex-1 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleReview}
              disabled={isLoading}
              className={`mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Code className="h-5 w-5 mr-2" />
              {isLoading ? 'Reviewing...' : 'Review Code'}
            </button>
            <button
              onClick={() => {
                setCode('');
                setReview('');
              }}
              className={`mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <TimerReset /> Reset All
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col h-[500px] border border-transparent dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Review Results</h2>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="flex-1 p-4 px-5 prose prose-sm sm:prose-base dark:prose-invert prose-headings:text-blue-600 dark:prose-headings:text-blue-400 prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent overflow-auto rounded-lg text-gray-800 dark:text-gray-200 transition-colors duration-200">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          wrapLongLines
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {review || "Review results will appear here..."}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import { useState } from "react";

function ChatBox({ answer, handleAskQuestion }) {

  const [question, setQuestion] = useState("");

  const handleSubmit = () => {

    handleAskQuestion(question);

    setQuestion("");
  };

  return (

    <div className="w-full md:w-96 bg-[#071127] border-l border-[#1b2942] flex flex-col min-h-[65vh] md:h-full">

      {/* HEADER */}

      <div className="p-4 border-b border-[#1b2942]">

        <h2 className="text-xl md:text-2xl font-bold text-violet-400">
          ASK AI
        </h2>

      </div>

      {/* ANSWER */}

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0">

        {

          answer ? (

            <div className="bg-[#0f1d37] border border-[#22314f] rounded-2xl p-4 text-gray-300 leading-7 whitespace-pre-wrap wrap-break-word text-sm md:text-base">

              {answer}

            </div>

          ) : (

            <div className="h-full flex items-center justify-center text-gray-500 text-center px-4 text-sm md:text-base">

              Ask anything about your PDF

            </div>
          )
        }

      </div>

      {/* INPUT */}

      <div className="p-3 border-t border-[#1b2942]">

        <div className="bg-[#16243f] rounded-2xl flex items-center px-3 py-2 gap-2">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your PDF..."
            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500 text-sm md:text-base min-w-0"
          />

          <button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatBox;
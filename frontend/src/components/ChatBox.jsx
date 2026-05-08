import { useState } from "react";

function ChatBox({ answer, handleAskQuestion }) {

  const [question, setQuestion] = useState("");

  const handleSubmit = () => {

    handleAskQuestion(question);

    setQuestion("");
  };

  return (

    <div className="w-96 bg-[#071127] border-l border-[#1b2942] flex flex-col justify-between">

      <div className="p-5 border-b border-[#1b2942]">

        <h2 className="text-2xl font-bold text-violet-400">
          ASK AI
        </h2>

      </div>

      {/* ANSWER */}

      <div className="flex-1 overflow-auto p-5">

        {

          answer ? (

            <div className="bg-[#0f1d37] border border-[#22314f] rounded-2xl p-5 text-gray-300 leading-8 whitespace-pre-wrap">

              {answer}

            </div>

          ) : (

            <div className="h-full flex items-center justify-center text-gray-500 text-center px-6">

              Ask anything about your PDF

            </div>
          )
        }

      </div>

      {/* INPUT */}

      <div className="p-4 border-t border-[#1b2942]">

        <div className="bg-[#16243f] rounded-2xl flex items-center px-4 py-3 gap-3">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your PDF..."
            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
          />

          <button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-500 text-white w-11 h-11 rounded-xl flex items-center justify-center"
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatBox;
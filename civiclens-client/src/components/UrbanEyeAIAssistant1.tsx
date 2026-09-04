import { useState } from "react";
import { Bot, Mic, X, MessageCircle, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function UrbanEyeAIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  const handleAskAI = () => {
    if (!message.trim()) return;

    console.log("User Question:", message);

    // Yahan future me Gemini/OpenAI API call kar sakti ho
    alert(`Question Submitted:\n${message}`);
  };

  return (
    <>
      {/* Floating AI Card */}
      <div
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          w-32 h-32
          cursor-pointer
          rounded-3xl
          bg-gradient-to-b
          from-green-500
          via-emerald-600
          to-green-700
          text-white
          p-3
          shadow-2xl
          hover:scale-105
          transition-all duration-300
        "
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="bg-white/20 p-2 rounded-full mb-2">
            <Bot className="w-5 h-5" />
          </div>

          <h3 className="font-bold text-sm">
            AI Assistant
          </h3>

          <MessageCircle className="w-5 h-5 my-1" />

          <p className="text-[10px] leading-tight">
            Ask Any Doubt
          </p>
        </div>
      </div>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-100 p-2 rounded-full">
                <Bot className="w-7 h-7 text-green-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  UrbanEye AI Assistant
                </h2>

                <p className="text-sm text-muted-foreground">
                  Ask anything about UrbanEyeAI
                </p>
              </div>
            </div>

            {/* Text Input */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your doubt here or use voice..."
              className="
                w-full
                min-h-[140px]
                rounded-lg
                border
                p-3
                mb-4
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

            {/* Voice + Type Options */}
            <div className="flex gap-3 mb-4">

              <button
                onClick={startListening}
                className={`flex-1 rounded-lg py-3 text-white font-medium transition-all ${
                  listening
                    ? "bg-red-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                }`}
              >
                🎤 {listening ? "Listening..." : "Speak"}
              </button>

              <button
                className="
                  flex-1
                  rounded-lg
                  py-3
                  bg-slate-800
                  text-white
                  font-medium
                "
              >
                💬 Type Doubt
              </button>

            </div>

            {/* Ask AI Button */}
            <button
              onClick={handleAskAI}
              className="
                w-full
                rounded-lg
                py-3
                bg-gradient-to-r
                from-green-500
                to-emerald-600
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Send className="w-4 h-4" />
              Ask AI
            </button>

          </Card>
        </div>
      )}
    </>
  );
}
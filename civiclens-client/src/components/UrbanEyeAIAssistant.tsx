import { useState } from "react";
import { Bot, Mic, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function UrbanEyeAIAssistant() {
  const [open, setOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser");
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
      setReportText(text);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  return (
    <>
      {/* Floating AI Card */}
      <div
        onClick={() => setOpen(true)}
        className="
          fixed bottom-5 right-5 z-50
  w-32 min-h-[145px]
  cursor-pointer
  rounded-2xl
  bg-gradient-to-b
  from-violet-500
  via-purple-600
  to-fuchsia-700
  text-white
  p-3
  shadow-xl
  hover:scale-105
  transition-all duration-300
        "
      >
        <div className="flex flex-col items-center text-center">
          {/* Bot Icon */}
          <div className="bg-white/20 p-2 rounded-full mb-2">
            <Bot className="w-7 h-7" />
          </div>

          <h3 className="font-bold text-base">
            UrbanEye AI
          </h3>

          {/* Mic Icon */}
          <div className="my-3">
            <Mic className="w-8 h-8" />
          </div>

          <p className="text-[11px] text-white/90 leading-relaxed">
            Report issues using your voice
          </p>

          {/* Button */}
          <div className="mt-3 w-full bg-white/20 rounded-full py-2 text-xs font-medium">
            Click to Start →
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-8 h-8 text-cyan-600" />

              <div>
                <h2 className="text-xl font-bold">
                  UrbanEye AI Assistant
                </h2>

                <p className="text-sm text-muted-foreground">
                  Speak your civic issue
                </p>
              </div>
            </div>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe the issue here..."
              className="w-full min-h-[160px] rounded-lg border p-3 mb-4"
            />

            <button
              onClick={startListening}
              className={`w-full rounded-lg py-3 mb-3 text-white font-medium ${
                listening
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600"
              }`}
            >
              🎤 {listening ? "Listening..." : "Start Voice Reporting"}
            </button>

            <button className="w-full rounded-lg py-3 bg-black text-white font-medium">
              Submit Report
            </button>
          </Card>
        </div>
      )}
    </>
  );
}  
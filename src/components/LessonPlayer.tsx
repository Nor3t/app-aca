"use client";

import { useState, useTransition } from "react";

type Lesson = {
  id: string;
  title: string;
  videoUrl?: string | null;
  duration?: number | null;
};

export function LessonPlayer({
  lesson,
  enrollmentId,
  completed,
}: {
  lesson: Lesson;
  enrollmentId: string;
  completed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(completed);
  const [marking, startMarking] = useTransition();

  function formatDuration(secs?: number | null) {
    if (!secs) return null;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  async function markComplete() {
    startMarking(async () => {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, lessonId: lesson.id }),
      });
      setDone(true);
    });
  }

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${done ? "border-green-200 bg-green-50/50" : "border-gray-100 bg-white"}`}>
      {/* Lesson header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
            done ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {done ? "✓" : <PlayIcon />}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${done ? "text-green-700" : "text-gray-900"}`}>
            {lesson.title}
          </p>
        </div>
        {lesson.duration && (
          <span className="text-xs text-gray-400 flex-shrink-0">{formatDuration(lesson.duration)}</span>
        )}
        <ChevronIcon open={open} />
      </button>

      {/* Lesson content */}
      {open && (
        <div className="border-t border-gray-100 p-4 bg-white">
          {lesson.videoUrl ? (
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4">
              {lesson.videoUrl.includes("vimeo") ? (
                <iframe
                  src={`https://player.vimeo.com/video/${lesson.videoUrl.split("/").pop()}?autoplay=1`}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video src={lesson.videoUrl} controls className="w-full h-full" />
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <p className="text-gray-400 text-sm">Video próximamente</p>
            </div>
          )}

          {!done && (
            <button
              onClick={markComplete}
              disabled={marking}
              className="bg-black text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {marking ? "Guardando..." : "Marcar como completada ✓"}
            </button>
          )}
          {done && (
            <p className="text-green-600 text-sm font-semibold">✓ Lección completada</p>
          )}
        </div>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

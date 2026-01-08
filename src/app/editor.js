"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

const PAGE_HEIGHT = 1056;

export default function Editor() {
  const contentRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing here...</p>",
    immediatelyRender: false,
    onUpdate() {
      calculatePages();
    },
  });

  const calculatePages = () => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.scrollHeight;
    const pages = Math.max(1, Math.ceil(contentHeight / PAGE_HEIGHT));
    setPageCount(pages);
  };

  useEffect(() => {
    calculatePages();
  }, []);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: pageCount }).map((_, index) => (
        <div
          key={index}
          className="bg-white w-[816px] min-h-[1056px] p-[96px] shadow-lg"
        >
          {index === 0 && (
            <div ref={contentRef}>
              <EditorContent editor={editor} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

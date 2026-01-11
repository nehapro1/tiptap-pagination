"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { useRef, useState, useEffect } from "react";

const CONTENT_HEIGHT = 864; 

export default function Editor() {
  const editorRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Start typing here...</p>",
    immediatelyRender: false,
    onUpdate: () => requestAnimationFrame(calculatePages),
  });

  const calculatePages = () => {
    if (!editorRef.current) return;
    const height = editorRef.current.scrollHeight;
    setPageCount(Math.max(1, Math.ceil(height / CONTENT_HEIGHT)));
  };

  useEffect(() => {
    calculatePages();
  }, []);

  const handlePrint = () => window.print();

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <button onClick={handlePrint}>Print / Export PDF</button>
      </div>

      {Array.from({ length: pageCount }).map((_, index) => (
        <div key={index} className="page">
          <div className="page-header">
            <h4>Document Title</h4>
          </div>

          {index === 0 && (
            <div className="page-content" ref={editorRef}>
              <EditorContent editor={editor} />
            </div>
          )}

          <div className="page-footer">
            Page {index + 1} of {pageCount}
          </div>
        </div>
      ))}
    </div>
  );
}

Tiptap Legal Document Editor – Prototype
Project Overview

This project is a Tiptap-based rich text editor that allows users to create professional, print-ready documents with real-time visual pagination. The main goal was to let users see how their document will appear when printed, including headers, footers, and page numbers.

We built a prototype that mimics Word/Google Docs style page layout, supporting standard formatting features like headings, paragraphs, bold/italic text, bullet lists, and tables.

What We Implemented
1. Visual Page Breaks

The editor displays multiple visual pages, giving users a clear idea of where content will fall when printed.

Extra pages appear dynamically as content grows.

The first page is editable, and extra pages act as visual guides to show page boundaries.

2. Print-Ready Layout

Pages are styled to match US Letter size (8.5" × 11") with standard 1-inch margins.

Page numbers and headers/footers are displayed consistently at the bottom and top of each page.

The Print / Export PDF button produces output that matches the editor view.

3. Standard Formatting

Supports headings, paragraphs, bold/italic text, bullet points, and tables.

Table rows are prevented from splitting awkwardly across pages (page-break-inside: avoid).

Content reflows properly when editing, maintaining visual alignment.

4. Edge Case Handling

Long paragraphs scroll within the first page instead of overflowing extra pages.

Footer placement is consistent across all pages using flex layout (justify-content: space-between).

Handles mixed formatting and varying line heights gracefully.

Page Breaks Approach

We calculate the number of visual pages based on the editor content height.

Formula: pageCount = Math.ceil(editorRef.current.scrollHeight / CONTENT_HEIGHT)

Only the first page is editable. Additional pages update dynamically to show page breaks visually.

This ensures users can visualize page boundaries, while the editor remains performant and simple.

Trade-offs / Limitations

Only the first page is editable; subsequent pages are visual guides.

Tables spanning multiple pages or very long content may not split perfectly.

Page break calculation is pixel-based, which can vary slightly across browsers or zoom levels.

Future Improvements

Enable multi-page editing, allowing typing across all pages.

Better handling of tables, images, and media across page breaks.

Support for custom paper sizes and more accurate print splitting.

How to Run

Clone the repository:

git clone <repository_url>


Install dependencies:

npm install


Run the development server:

npm run dev


Open the editor in your browser at http://localhost:3000.

Start typing — visual page breaks and page numbers appear automatically.

Click Print / Export PDF to generate a print-ready document
"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTopMenuBar from "./TipTopMenuBar";

interface Props {
  onContentChanged: (content: string) => void;
}

const TipTapEditor: React.FC<Props> = ({ onContentChanged }) => {
  const [editorState, setEditorState] = useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setEditorState(editor.getHTML());
      onContentChanged(htmlContent);
    },
  });

  return (
    <>
      <div className="flex mb-3">
        {editor && <TipTopMenuBar editor={editor} />}
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;

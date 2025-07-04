/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sEvent2 } from "../eventStore";

export default function MyEditor() {
  const eventInfo = sEvent2.use();
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        apiKey="hozng8n52d0vnc1g9cp2ydbxtko8xla9bqag80emlopa1inb" // Thay bằng API Key của bạn
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={eventInfo.description} // Giá trị ban đầu để load dữ liệu đã có
        onBlur={() => {
          if (editorRef.current) {
            const content = editorRef.current.getContent();
            sEvent2.set((prev) => {
              prev.value.description = content;
            });
          }
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; direction: ltr; }",
        }}
      />
    </>
  );
}

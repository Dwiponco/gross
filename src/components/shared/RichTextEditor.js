import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = forwardRef((props, ref) => {
  const modules = {
    toolbar: false,
    theme: "snow",
  };
  return (
    <div className="rich-text-editor">
      <ReactQuill ref={ref} {...props} modules={modules} />
    </div>
  );
});

export default RichTextEditor;

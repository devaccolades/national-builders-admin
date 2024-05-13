import EditorToolbar, { modules, formats, } from "../../components/utils/EditorToolbar";
import ReactQuill from 'react-quill';
function QwillInpurBox(values) {
  return (
    <>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        name="body"
        // onBlur={handleBlur}
        value={values?.body}
        onChange={(content) => {
          setFieldValue("body", content);
        }}
        className="h-[15rem] max-h-[15rem] w-full"
        modules={modules}
        formats={formats}
      />
    </>
  )
}

export default QwillInpurBox
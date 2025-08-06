import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

type Props = {
  placeholder?: string;
  content?: string;
  initialContent?: string;
  name?: string;
  handleChangeContent?: (value: string) => void;
};
const JoditRichTextEditor = ({
  placeholder,
  content,
  initialContent,
  handleChangeContent,
}: Props) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
      style: {
        color: "#000000",
      },
      events: {
        // Intercept the paste event and prevent the default behavior
        // paste: (event: ClipboardEvent) => {
        //   event.preventDefault();
        //   toast.error("Pasting content not allowed!");
        //   return false;
        // },
      },
      // toolbarButtonSize: 'middle',
      // buttons: ["image", "bold", "italic", "underline", "link", "unlink"],
      removeButtons: ["file", "video", "image", "paste", "clipboard", "source"],
      disablePlugins: ["paste", "source", "clipboard"],
      filebrowser: {
        showFileSize: false,
        showFoldersPanel: false,
        permissionsPresets: {
          allowFiles: false,
          allowFileMove: false,
          allowFileUpload: true,
          allowFileUploadRemote: true,
          allowFileRemove: false,
          allowFileRename: false,
          allowFolders: false,
          allowFolderCreate: false,
          allowFolderMove: false,
          allowFolderRemove: false,
          allowFolderRename: false,
          allowImageResize: true,
          allowImageCrop: true,
        },
        ajax: {
          url: "https://xdsoft.net/jodit/finder/",
        },
      },
      initialContent: initialContent,
      content: initialContent,
    }),
    [placeholder]
  );
  console.log("");
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          // if(handleChangeContent){
          //   handleChangeContent(newContent)
          // }
          if (handleChangeContent) {
            handleChangeContent(newContent);
          }
        }} // preferred to use only this option to update the content for performance reasons
        onChange={(_newContent) => {}}
      />
    </div>
  );
};

export default JoditRichTextEditor;

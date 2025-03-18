import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import {
  Box,
  FormControl,
  FormHelperText,
  SxProps,
  Typography,
} from '@mui/material';
import './index.scss';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  helperTextCss?: SxProps;
  customModules?: any;
  editorCss?: object;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  error,
  helperText,
  label,
  placeholder,
  defaultValue,
  helperTextCss,
  editorCss,
  customModules,
}) => {
  const handleEditorChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    if (editor.getLength() <= 501) {
      // 500 characters + 1 for the newline
      onChange(content);
    }
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],

    ['clean'], // remove formatting button
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '0.25rem',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
      <FormControl error={error}>
        <ReactQuill
          className="text-editor"
          style={editorCss}
          value={value}
          onChange={handleEditorChange}
          modules={customModules ? customModules : { toolbar: toolbarOptions }}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {helperText && (
          <FormHelperText
            sx={{
              marginLeft: 0,
              width: '100%',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              // Support for warning message
              color: error ? 'var(--red-600)' : 'var(--gray-50)',
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default TextEditor;

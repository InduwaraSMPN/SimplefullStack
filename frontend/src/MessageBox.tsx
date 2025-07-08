import { Alert } from '@mui/material';

interface MessageBoxProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type }) => {
  return (
    <Alert severity={type} sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
      {message}
    </Alert>
  );
};

export default MessageBox; 
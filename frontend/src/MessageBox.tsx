interface MessageBoxProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type }) => {
  const baseClasses = "p-4 rounded-xl text-sm my-4 shadow-lg transition-all duration-300";
  const typeClasses = {
    success: "bg-green-50 border border-green-200 text-green-800",
    error: "bg-red-50 border border-red-200 text-red-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      <pre className="font-mono whitespace-pre-wrap text-gray-700">{message}</pre>
    </div>
  );
};

export default MessageBox; 
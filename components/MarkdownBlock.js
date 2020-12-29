import Markdown from 'react-markdown';

const MarkdownBlock = ({ content }) => {
  return (
    <div className="markdown-container">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default MarkdownBlock;

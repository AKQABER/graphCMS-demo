import TextBlock from '../components/TextBlock';
import HeadingBlock from '../components/HeadingBlock';
import ImageBlock from '../components/ImageBlock';
import MarkdownBlock from '../components/MarkdownBlock';

const renderComponent = component => {
  if (component.type === 'TextBlock') {
    return (
      <TextBlock
        key={component.title}
        title={component.title}
        content={component.content}
      />
    );
  } else if (component.type === 'HeadingBlock') {
    return <HeadingBlock key={component.heading} heading={component.heading} />;
  } else if (component.type === 'ImageBlock') {
    return (
      <ImageBlock
        key={component.image.url}
        imageUrl={component.image.url}
        description={component.description}
        link={component.link}
      />
    );
  } else if (component.type === 'MarkdownBlock') {
    return <MarkdownBlock content={component.content} />;
  } else {
    return null;
  }
};

export default renderComponent;

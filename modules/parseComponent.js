import TextBlock from '../components/TextBlock';
import HeadingBlock from '../components/HeadingBlock';
import ImageBlock from '../components/ImageBlock';

const parseComponent = (component) => {
  if (component.type === "TextBlock") {
    return (
      <TextBlock
        key={component.title}
        title={component.title}
        content={component.content}
      />
    )
  } else if (component.type === "HeadingBlock") {
    return (
      <HeadingBlock
        key={component.heading}
        heading={component.heading}
      />
    )
  } else if (component.type === "ImageBlock") {
    return (
      <ImageBlock
        key={component.image.url}
        imageUrl={component.image.url}
        description={component.description}
        link={component.link}
      />
    )
  } else {
    return null
  }
}

export default parseComponent

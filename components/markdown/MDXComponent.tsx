import Image from 'next/image';

function NextImageComponent(props: React.HTMLProps<HTMLImageElement>) {
  const src = props.src;

  if (src) {
    if (src.startsWith('http')) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={src} />;
    }
    return (
      <Image
        {...props}
        src={src}
        alt={src}
        crossOrigin="anonymous"
        placeholder="empty"
      />
    );
  }

  return <p>Currently, image is not available. {src}</p>;
}

const MDXComponent = {
  img: NextImageComponent,
};

export default MDXComponent;

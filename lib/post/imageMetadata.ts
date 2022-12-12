import { imageSize } from 'image-size';
import type { Processor } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';

const sizeOf = promisify(imageSize);

const IMAGE_PATH = `${process.cwd()}/public`;

interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    alt?: string;
    height?: number;
    width?: number;
  };
}

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

async function addMetadata(node: ImageNode): Promise<void> {
  const {
    properties: { src, alt },
  } = node;

  if (src.startsWith('http')) {
    return;
  }

  const imageSize = await sizeOf(`${IMAGE_PATH}${src}`);

  if (imageSize) {
    node.properties.width = imageSize.width;
    node.properties.height = imageSize.height;
  }
  node.properties.src = src;
  node.properties.alt = alt ?? '';
}

export default function imageMetadata() {
  return function (this: Processor) {
    return async function transformer(tree: Node): Promise<Node> {
      const imgNodes: ImageNode[] = [];
      visit(tree, 'element', (node) => {
        if (isImageNode(node)) {
          imgNodes.push(node);
        }
      });

      for await (const node of imgNodes) {
        await addMetadata(node);
      }

      return tree;
    };
  };
}

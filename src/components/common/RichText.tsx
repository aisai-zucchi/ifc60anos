import React from 'react';
import Image from 'next/image';

// This is a simplified Lexical renderer for Payload 3
// It handles paragraphs, headings, lists, and embedded media (uploads)

export default function RichText({ content }: { content: any }) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  const renderNode = (node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
            {node.children?.map((child: any, i: number) => renderText(child, i))}
          </p>
        );
      case 'heading':
        const Tag = node.tag as any;
        return (
          <Tag key={index} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 600 }}>
            {node.children?.map((child: any, i: number) => renderText(child, i))}
          </Tag>
        );
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        const listStyle = node.listType === 'number' ? 'decimal' : 'disc';
        return (
          <ListTag key={index} style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', listStyleType: listStyle }}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </ListTag>
        );
      case 'listitem':
        return (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {node.children?.map((child: any, i: number) => renderText(child, i))}
          </li>
        );
      case 'upload':
        // Handle embedded images/media
        const value = node.value;
        if (value && value.url) {
          return (
            <figure key={index} style={{ margin: '2rem 0', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <Image 
                  src={value.url} 
                  alt={value.alt || ''} 
                  width={value.width || 1200}
                  height={value.height || 800}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                  sizes="(max-width: 800px) 100vw, 800px"
                />
              </div>
              {value.alt && <figcaption style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.5rem' }}>{value.alt}</figcaption>}
            </figure>
          );
        }
        return null;
      default:
        return null;
    }
  };

  const renderText = (child: any, index: number) => {
    if (child.type === 'text') {
      let text = child.text;
      let element: React.ReactNode = <span key={index}>{text}</span>;
      
      if (child.format & 1) element = <strong key={index}>{element}</strong>; // Bold
      if (child.format & 2) element = <em key={index}>{element}</em>; // Italic

      return element;
    }
    if (child.type === 'link') {
      return (
        <a key={index} href={child.fields?.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>
          {child.children?.map((c: any, i: number) => renderText(c, i))}
        </a>
      );
    }
    return null;
  };

  return (
    <div className="rich-text">
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  );
}

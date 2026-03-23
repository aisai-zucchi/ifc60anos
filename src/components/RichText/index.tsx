import React, { JSX } from 'react'

const serialize = (nodes: any[]): React.ReactNode[] => {
  if (!nodes) return []

  return nodes.map((node, i) => {
    if (node.type === 'text') {
      let text = <span key={i}>{node.text}</span>
      if (node.format & 1) text = <strong key={i}>{text}</strong> // Negrito
      if (node.format & 2) text = <em key={i}>{text}</em> // Italico
      return text
    }

    const children = node.children ? serialize(node.children) : []

    switch (node.type) {
      //paragrafos
      case 'paragraph':
        return <p key={i} className="mb-4">{children}</p>
      
      //Titulos
      case 'heading':
        const Tag = node.tag as keyof JSX.IntrinsicElements
        return <Tag key={i} className="font-bold my-4">{children}</Tag>

      //llistas
      case 'list':
        return node.listType === 'bullet' 
          ? <ul key={i} className="list-disc ml-6 my-4">{children}</ul>
          : <ol key={i} className="list-decimal ml-6 my-4">{children}</ol>
      
      case 'listitem':
        return <li key={i}>{children}</li>

      default:
        return <div key={i}>{children}</div>
    }
  })
}

export const RichText = ({ content }: { content: any }) => {
  if (!content || !content.root || !content.root.children) return null

  return (
    <div className="rich-text-container">
      {serialize(content.root.children)}
    </div>
  )
}
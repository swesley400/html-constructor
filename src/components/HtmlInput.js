import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const TagList = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
`;

const Tag = styled.div`
  padding: 4px 8px;
  margin: 2px 0;
  background: #e9ecef;
  border-radius: 4px;
  font-family: monospace;
`;

const parseStyle = (styleString) => {
  if (!styleString) return {};
  return styleString.split(';')
    .filter(style => style.trim())
    .reduce((acc, style) => {
      const [property, value] = style.split(':').map(str => str.trim());
      if (property && value) {
        // Converter propriedades CSS para camelCase
        const camelProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[camelProperty] = value;
      }
      return acc;
    }, {});
};

const getNodeContent = (node) => {
  if (!node.props || !node.props.children) return '';
  
  if (typeof node.props.children === 'string') {
    return node.props.children;
  }
  
  if (Array.isArray(node.props.children)) {
    return node.props.children
      .map(child => {
        if (typeof child === 'string') return child;
        if (child.props && child.props.children) return getNodeContent(child);
        return '';
      })
      .join('');
  }
  
  return '';
};

const HtmlInput = ({ onImportHtml }) => {
  const [htmlCode, setHtmlCode] = useState('');
  const [tags, setTags] = useState([]);

  const extractTags = (html) => {
    const tagRegex = /<\/?([a-z0-9]+)[^>]*>/gi;
    const matches = html.match(tagRegex) || [];
    const uniqueTags = [...new Set(matches.map(tag => {
      const match = tag.match(/<\/?([a-z0-9]+)/i);
      return match ? match[1].toLowerCase() : null;
    }).filter(Boolean))];
    return uniqueTags;
  };

  const handleHtmlChange = (e) => {
    const newHtml = e.target.value;
    setHtmlCode(newHtml);
    setTags(extractTags(newHtml));
  };

  const handleImport = () => {
    try {
      const parsed = parse(htmlCode, {
        replace: domNode => {
          if (domNode.type === 'tag') {
            return {
              ...domNode,
              attribs: {
                ...domNode.attribs,
                style: domNode.attribs?.style || ''
              }
            };
          }
        }
      });

      const components = [];
      let baseOffset = 20;

      const processNode = (node, depth = 0) => {
        if (node.type && typeof node.type === 'string') {
          const nodeStyle = node.props?.style || node.props?.className;
          const parsedStyle = parseStyle(nodeStyle);
          
          const existingPosition = parsedStyle.position === 'absolute' || 
                                 parsedStyle.position === 'relative' || 
                                 parsedStyle.position === 'fixed';

          const componentStyle = {
            ...parsedStyle,
            position: 'absolute',
            left: existingPosition ? parsedStyle.left : `${baseOffset + (depth * 20)}px`,
            top: existingPosition ? parsedStyle.top : `${baseOffset + (depth * 20)}px`,
            zIndex: depth
          };

          components.push({
            id: Date.now() + depth,
            type: node.type,
            style: componentStyle,
            content: getNodeContent(node) || `${node.type} element`,
            originalStyle: nodeStyle
          });
        }
      };

      const traverse = (element, depth = 0) => {
        if (Array.isArray(element)) {
          element.forEach((child, idx) => traverse(child, depth + idx));
        } else if (element && typeof element === 'object') {
          processNode(element, depth);
          if (element.props && element.props.children) {
            traverse(element.props.children, depth + 1);
          }
        }
      };

      traverse(parsed);
      onImportHtml(components);
    } catch (error) {
      console.error('Error parsing HTML:', error);
      alert('Error parsing HTML. Please check your code.');
    }
  };

  return (
    <InputContainer>
      <TextArea
        value={htmlCode}
        onChange={handleHtmlChange}
        placeholder="Cole seu código HTML aqui..."
      />
      <Button onClick={handleImport}>Importar HTML</Button>
      {tags.length > 0 && (
        <TagList>
          <h4>Tags encontradas:</h4>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagList>
      )}
    </InputContainer>
  );
};

export default HtmlInput;

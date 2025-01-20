import React, { useState, useEffect } from 'react';
import DraggableHtmlElement from './DraggableHtmlElement';
import styled from 'styled-components';
import { parse } from 'node-html-parser';

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const HtmlPreviewArea = styled.div`
  position: relative;
  width: 3000px;
  height: 2000px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ComponentWrapper = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
`;

const PreviewContent = styled.div`
  height: 100%;
  padding: 20px;
  width: 100%;
  position: relative;
`;

const StyledHtmlPreview = ({ htmlContent, onUpdateHtml }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    try {
      const root = parse(htmlContent);
      const processedElements = [];
      let index = 0;

      const shouldProcessElement = (node) => {
        if (!node.tagName) return false;
        const tag = node.tagName.toLowerCase();
        return !['html', 'head', 'script', 'style'].includes(tag);
      };

      const processNode = (node, parentId = null, level = 0) => {
        if (node.nodeType === 1 && shouldProcessElement(node)) {
          const element = {
            id: `element-${index++}`,
            html: node.outerHTML,
            tag: node.tagName.toLowerCase(),
            position: { x: 20 * level, y: 20 * index },
            zIndex: level * 100 + index,
            parentId,
            level
          };
          processedElements.push(element);
          return element.id;
        }
        return parentId;
      };

      const processTree = (node, parentId = null, level = 0) => {
        if (!node) return;
        
        const currentId = processNode(node, parentId, level);
        
        if (node.childNodes) {
          node.childNodes.forEach(child => {
            if (child.nodeType === 1 && shouldProcessElement(child)) {
              processTree(child, currentId, level + 1);
            }
          });
        }
      };

      const bodyElement = root.querySelector('body') || root;
      processTree(bodyElement);
      
      setElements(processedElements);
    } catch (error) {
      console.error('Error parsing HTML:', error);
    }
  }, [htmlContent]);

  const handleDrag = (id, position) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, position } : el
    ));
  };

  return (
    <EditorContainer>
      <HtmlPreviewArea>
        <ComponentWrapper>
          <PreviewContent>
            {elements.map((element) => (
              <DraggableHtmlElement
                key={element.id}
                element={element}
                onDrag={(position) => handleDrag(element.id, position)}
                style={{
                  left: element.position?.x || 0,
                  top: element.position?.y || 0,
                  zIndex: element.zIndex
                }}
              >
                {element.html}
              </DraggableHtmlElement>
            ))}
          </PreviewContent>
        </ComponentWrapper>
      </HtmlPreviewArea>
    </EditorContainer>
  );
};

export default StyledHtmlPreview;

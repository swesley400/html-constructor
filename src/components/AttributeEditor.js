import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 15px;
  z-index: 1000;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const AttributeGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const AttributeEditor = ({ element, onUpdate, onClose }) => {
  const [attributes, setAttributes] = useState({});
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (element) {
      const attrs = {};
      Array.from(element.attributes).forEach(attr => {
        attrs[attr.name] = attr.value;
      });
      setAttributes(attrs);
      setTagName(element.tagName.toLowerCase());
    }
  }, [element]);

  const handleChange = (name, value) => {
    const newAttributes = { ...attributes, [name]: value };
    setAttributes(newAttributes);
    onUpdate(newAttributes);
  };

  const commonAttributes = ['id', 'class', 'style'];
  const tagSpecificAttributes = {
    a: ['href', 'target'],
    img: ['src', 'alt'],
    input: ['type', 'value', 'placeholder'],
    button: ['type'],
  };

  const relevantAttributes = [
    ...commonAttributes,
    ...(tagSpecificAttributes[tagName] || [])
  ];

  return (
    <EditorContainer>
      <Title>
        Editar {tagName}
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Title>

      {relevantAttributes.map(attr => (
        <AttributeGroup key={attr}>
          <Label>{attr}</Label>
          {attr === 'style' ? (
            <TextArea
              value={attributes[attr] || ''}
              onChange={(e) => handleChange(attr, e.target.value)}
              placeholder="color: blue; font-size: 16px;"
            />
          ) : (
            <Input
              type="text"
              value={attributes[attr] || ''}
              onChange={(e) => handleChange(attr, e.target.value)}
              placeholder={`Digite o valor para ${attr}`}
            />
          )}
        </AttributeGroup>
      ))}
    </EditorContainer>
  );
};

export default AttributeEditor;

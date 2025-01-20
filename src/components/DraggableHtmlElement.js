import React, { useState } from 'react';
import styled from 'styled-components';

const DraggableDiv = styled.div`
  position: absolute;
  cursor: grab;
  border: 1px dashed transparent;
  
  &:hover {
    border-color: #007bff;
  }

  &.dragging {
    cursor: grabbing;
    opacity: 0.7;
  }
`;

const ElementControls = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  background: #007bff;
  border-radius: 4px;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1000;

  ${DraggableDiv}:hover & {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 2px 8px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const EditModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  min-width: 400px;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin: 10px 0;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &.save {
    background: #007bff;
    color: white;
  }

  &.cancel {
    background: #f8f9fa;
    border: 1px solid #ddd;
  }
`;

const DraggableHtmlElement = ({ 
  element, 
  children, 
  onDrag,
  onBringToFront,
  onSendToBack,
  isEditing,
  onEditSave,
  onEditCancel,
  style 
}) => {
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ 
    x: style?.left || 0, 
    y: style?.top || 0 
  });
  const [editContent, setEditContent] = useState(children);

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // Apenas botão esquerdo
    
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.pageX - position.x;
    const startY = e.pageY - position.y;
    
    setDragging(true);
    setDragStart({ x: startX, y: startY });

    const onMouseMove = (e) => {
      const newX = e.pageX - dragStart.x;
      const newY = e.pageY - dragStart.y;
      
      setPosition({ x: newX, y: newY });
      onDrag?.({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      <DraggableDiv
        className={dragging ? 'dragging' : ''}
        style={{
          ...style,
          left: position.x,
          top: position.y
        }}
        onMouseDown={onMouseDown}
      >
        <div dangerouslySetInnerHTML={{ __html: children }} />
        <ElementControls onClick={e => e.stopPropagation()}>
          <ControlButton onClick={(e) => { e.stopPropagation(); onBringToFront?.(); }}>↑</ControlButton>
          <ControlButton onClick={(e) => { e.stopPropagation(); onSendToBack?.(); }}>↓</ControlButton>
        </ElementControls>
      </DraggableDiv>

      {isEditing && (
        <EditModal onClick={(e) => e.stopPropagation()}>
          <h3>Editar HTML</h3>
          <EditTextarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <EditButtons>
            <EditButton 
              className="cancel" 
              onClick={onEditCancel}
            >
              Cancelar
            </EditButton>
            <EditButton 
              className="save" 
              onClick={() => onEditSave?.(element.id, editContent)}
            >
              Salvar
            </EditButton>
          </EditButtons>
        </EditModal>
      )}
    </>
  );
};

export default DraggableHtmlElement;

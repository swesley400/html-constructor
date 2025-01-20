import React, { useState } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StyledHtmlPreview from './components/StyledHtmlPreview';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const EditorPanel = styled.div`
  width: 30%;
  padding: 20px;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CodeEditor = styled.textarea`
  flex: 1;
  padding: 15px;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #d4d4d4;
  background: #2d2d2d;
  border: none;
  border-radius: 4px;
  resize: none;
  outline: none;
  white-space: pre;
  tab-size: 2;

  &::placeholder {
    color: #6d6d6d;
  }
`;

const PreviewPanel = styled.div`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const App = () => {
  const [htmlContent, setHtmlContent] = useState(`
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <div style="background-color: #003366; padding: 20px; text-align: center; border-radius: 8px;">
    <h1 style="color: #ffffff; margin: 0;">Bem-vindo à Nossa Plataforma</h1>
  </div>
  
  <div style="padding: 20px;">
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">
      Agradecemos por se juntar à nossa plataforma. Estamos muito felizes por tê-lo conosco!
    </p>
    
    <p style="color: #333333; font-size: 16px; line-height: 1.5;">
      Para começar a explorar nossos serviços, clique no botão abaixo:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
        Acessar Minha Conta
      </a>
    </div>
    
    <p style="color: #666666; font-size: 14px;">
      Se você não se cadastrou, ignore este e-mail.
    </p>
  </div>
  
  <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px;">
    <p style="color: #666666; font-size: 14px; margin: 0;">
      2025 Minha Empresa. Todos os direitos reservados.
    </p>
  </div>
</div>
  `.trim());

  const handleHtmlChange = (e) => {
    setHtmlContent(e.target.value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <EditorPanel>
          <CodeEditor
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Cole ou edite seu código HTML aqui..."
            spellCheck="false"
          />
        </EditorPanel>
        <PreviewPanel>
          <PreviewContainer>
            <StyledHtmlPreview htmlContent={htmlContent} />
          </PreviewContainer>
        </PreviewPanel>
      </AppContainer>
    </DndProvider>
  );
};

export default App;

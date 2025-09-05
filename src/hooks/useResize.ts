'use client';

import { useState, useCallback } from 'react';

interface ResizeState {
  isResizing: boolean;
  direction: string | null;
  startPos: { x: number; y: number };
  startSize: { width: number; height: number };
}

interface PanelState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useResize = (panelState: PanelState, setPanelState: (state: any) => void) => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    direction: null,
    startPos: { x: 0, y: 0 },
    startSize: { width: 0, height: 0 }
  });

  const handleResizeStart = useCallback((direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setResizeState({
      isResizing: true,
      direction,
      startPos: { x: e.clientX, y: e.clientY },
      startSize: { width: panelState.width, height: panelState.height }
    });
  }, [panelState.width, panelState.height]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeState.isResizing) return;

    const deltaX = e.clientX - resizeState.startPos.x;
    const deltaY = e.clientY - resizeState.startPos.y;
    
    let newWidth = resizeState.startSize.width;
    let newHeight = resizeState.startSize.height;
    let newX = panelState.x;
    let newY = panelState.y;

    if (resizeState.direction?.includes('e')) {
      newWidth = Math.max(320, resizeState.startSize.width + deltaX);
    }
    if (resizeState.direction?.includes('w')) {
      newWidth = Math.max(320, resizeState.startSize.width - deltaX);
      newX = panelState.x + (resizeState.startSize.width - newWidth);
    }
    if (resizeState.direction?.includes('s')) {
      newHeight = Math.max(400, resizeState.startSize.height + deltaY);
    }
    if (resizeState.direction?.includes('n')) {
      newHeight = Math.max(400, resizeState.startSize.height - deltaY);
      newY = panelState.y + (resizeState.startSize.height - newHeight);
    }

    setPanelState({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    });
  }, [resizeState, panelState.x, panelState.y, setPanelState]);

  const handleResizeEnd = useCallback(() => {
    setResizeState({
      isResizing: false,
      direction: null,
      startPos: { x: 0, y: 0 },
      startSize: { width: 0, height: 0 }
    });
  }, []);

  return {
    resizeState,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd
  };
};

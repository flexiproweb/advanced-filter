// src/hooks/useDragAndDrop.ts
'use client';

import { useState, useRef, useCallback } from 'react';

interface DragState {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

interface PanelState {
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isCollapsed: boolean;
}

export const useDragAndDrop = (initialState: PanelState) => {
  const [panelState, setPanelState] = useState<PanelState>(initialState);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 }
  });
  
  // Add force update state to trigger re-render
  const [, forceUpdate] = useState({});

  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragState({
      isDragging: true,
      dragOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
    e.preventDefault();
  }, []);

  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const newX = Math.max(0, Math.min(
      window.innerWidth - panelState.width,
      e.clientX - dragState.dragOffset.x
    ));
    const newY = Math.max(0, Math.min(
      window.innerHeight - (panelState.isMinimized ? 50 : panelState.height),
      e.clientY - dragState.dragOffset.y
    ));

    setPanelState(prev => ({ ...prev, x: newX, y: newY }));
  }, [dragState, panelState.width, panelState.height, panelState.isMinimized]);

  const handleDragEnd = useCallback(() => {
    setDragState({ isDragging: false, dragOffset: { x: 0, y: 0 } });
  }, []);

  // Fixed reset function with force update
  const resetPanel = useCallback(() => {
    const modalWidth = 380;
    const modalHeight = 528;
    const centerX = Math.max(0, (window.innerWidth - modalWidth) / 2);
    const centerY = Math.max(0, (window.innerHeight - modalHeight) / 2);
    
    // Force update to ensure re-render
    forceUpdate({});
    
    setPanelState({
      x: centerX,
      y: centerY,
      width: modalWidth,
      height: modalHeight,
      isMinimized: false,
      isCollapsed: false,
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setPanelState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const toggleCollapse = useCallback(() => {
    setPanelState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  }, []);

  return {
    panelState,
    setPanelState,
    dragState,
    panelRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPanel,
    toggleMinimize,
    toggleCollapse,
  };
};

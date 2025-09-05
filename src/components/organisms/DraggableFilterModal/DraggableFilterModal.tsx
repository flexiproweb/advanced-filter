// src/components/organisms/DraggableFilterModal/DraggableFilterModal.tsx
'use client';

import { useEffect } from 'react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useResize } from '@/hooks/useResize';
import ModalHeader from '@/components/molecules/ModalHeader';
import FormField from '@/components/molecules/FormField';
import ResizeHandle from '@/components/molecules/ResizeHandle';
import Button from '@/components/atoms/Button';
import { FilterState, FilterOption } from '@/types';

interface DraggableFilterModalProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters: (filters: FilterState) => void;
    onClearFilters: () => void;
    onClose: () => void;
}

const filterOptions = {
    caseType: [
        { value: '', label: 'Choose...' },
        { value: 'Quality Deviations', label: 'Quality Deviations' },
        { value: 'Demo Scheduled Case', label: 'Demo Scheduled Case' },
        { value: 'Production Issue', label: 'Production Issue' },
    ] as FilterOption[],
    reason: [
        { value: '', label: 'Choose...' },
        { value: 'QA7', label: 'QA7' },
        { value: 'BG_RS_SCH_002', label: 'BG_RS_SCH_002' },
        { value: 'QUALITY_CHECK', label: 'QUALITY_CHECK' },
    ] as FilterOption[],
    status: [
        { value: '', label: 'Choose...' },
        { value: 'DRAFT', label: 'DRAFT' },
        { value: 'ACTIVE', label: 'ACTIVE' },
        { value: 'COMPLETED', label: 'COMPLETED' },
        { value: 'CANCELLED', label: 'CANCELLED' },
    ] as FilterOption[],
    type: [
        { value: '', label: 'Choose...' },
        { value: 'Quality Hold', label: 'Quality Hold' },
        { value: 'SKU', label: 'SKU' },
        { value: 'Inventory Hold', label: 'Inventory Hold' },
    ] as FilterOption[],
};

const DraggableFilterModal: React.FC<DraggableFilterModalProps> = ({
    filters,
    onFiltersChange,
    onApplyFilters,
    onClearFilters,
    onClose,
}) => {
    // Calculate center position
    const getInitialPosition = () => {
        const modalWidth = 380;
        const modalHeight = 528;
        return {
            x: Math.max(0, (window.innerWidth - modalWidth) / 2),
            y: Math.max(0, (window.innerHeight - modalHeight) / 2),
            width: modalWidth,
            height: modalHeight,
            isMinimized: false,
            isCollapsed: false,
        };
    };

    const {
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
    } = useDragAndDrop(getInitialPosition());

    const { resizeState, handleResizeStart, handleResizeMove, handleResizeEnd } = useResize(
        panelState,
        (updates: any) => setPanelState((prev: any) => ({ ...prev, ...updates }))
    );

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    const updateFilter = (key: keyof FilterState, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    // Reset button works same as clear button
    const handleReset = () => {
        onClearFilters(); // Same functionality as clear button
    };

    const handleClose = () => {
        onClose();
    };

    // Global mouse event handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            handleDragMove(e);
            handleResizeMove(e);
        };

        const handleMouseUp = () => {
            handleDragEnd();
            handleResizeEnd();
        };

        if (dragState.isDragging || resizeState.isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';

            document.body.style.cursor = resizeState.isResizing ? `${resizeState.direction}-resize` : 'default';

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
            };
        }
    }, [dragState.isDragging, resizeState.isResizing, handleDragMove, handleResizeMove, handleDragEnd, handleResizeEnd]);

    const currentHeight = panelState.isMinimized ? 50 : panelState.height;

    return (
        <>
            {/* Background overlay - only show when not minimized */}
            {!panelState.isMinimized && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-modal" onClick={handleClose} />
            )}

            <div
                ref={panelRef}
                className={`fixed bg-white rounded-xl shadow-2xl border-2 transition-all duration-200 z-modal ${dragState.isDragging ? 'shadow-3xl ring-2 ring-blue-400 ring-opacity-50' : 'border-gray-200'
                    } ${resizeState.isResizing ? 'ring-2 ring-green-400 ring-opacity-50' : ''}`}
                style={{
                    left: `${panelState.x}px`,
                    top: `${panelState.y}px`,
                    width: `${panelState.width}px`,
                    height: `${currentHeight}px`,
                    minWidth: '320px',
                    minHeight: panelState.isMinimized ? '50px' : '350px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Resize Handles */}
                {!panelState.isMinimized && (
                    <>
                        <ResizeHandle direction="nw" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="ne" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="sw" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="se" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="n" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="s" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="w" onMouseDown={handleResizeStart} />
                        <ResizeHandle direction="e" onMouseDown={handleResizeStart} />
                    </>
                )}

                <ModalHeader
                    title="Advanced Filters"
                    filterCount={activeFiltersCount}
                    isMinimized={panelState.isMinimized}
                    onMouseDown={handleDragStart}
                    onToggleCollapse={toggleCollapse}
                    onToggleMinimize={toggleMinimize}
                    onReset={handleReset} // Position reset
                    onClear={handleReset} // Filter reset (same as clear)
                    onClose={handleClose}
                    isDragging={dragState.isDragging}
                />

                {/* Panel Content */}
                {!panelState.isMinimized && !panelState.isCollapsed && (
                    <>
                        {/* Scrollable Content Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-4 no-drag no-scrollbar"
                            style={{
                                height: `${currentHeight - 64 - 80}px`,
                                minHeight: '200px',
                                maxHeight: `${currentHeight - 64 - 80}px`
                            }}
                        >
                            <FormField
                                label="Case Number"
                                placeholder="Enter case number"
                                value={filters.caseNumber}
                                onChange={(value) => updateFilter('caseNumber', value)}
                            />

                            <FormField
                                label="Case Type"
                                type="select"
                                options={filterOptions.caseType}
                                value={filters.caseType}
                                onChange={(value) => updateFilter('caseType', value)}
                            />

                            <FormField
                                label="Reason"
                                type="select"
                                options={filterOptions.reason}
                                value={filters.reason}
                                onChange={(value) => updateFilter('reason', value)}
                            />

                            <FormField
                                label="Status"
                                type="select"
                                options={filterOptions.status}
                                value={filters.status}
                                onChange={(value) => updateFilter('status', value)}
                            />

                            <FormField
                                label="Type"
                                type="select"
                                options={filterOptions.type}
                                value={filters.type}
                                onChange={(value) => updateFilter('type', value)}
                            />

                            <FormField
                                label="Target Value"
                                placeholder="Enter target value"
                                value={filters.targetValue}
                                onChange={(value) => updateFilter('targetValue', value)}
                            />

                            {/* Applied Date with conditional margin */}
            
                            <FormField
                                label="Applied Date"
                                inputType="date"
                                value={filters.appliedDate}
                                onChange={(value) => updateFilter('appliedDate', value)}
                                className={filters.appliedDate && filters.appliedDate.trim() !== '' ? 'mb-6' : ''}
                            />

                        </div>

                        {/* Fixed Footer */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 rounded-b-xl no-drag"
                            style={{ height: '80px' }}
                        >
                            <div className="p-4 h-full flex items-center">
                                <div className="flex w-full gap-3">
                                    <button
                                        onClick={handleApply}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        onClick={onClearFilters}
                                        className="flex-1 bg-gray-100 text-gray-900 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DraggableFilterModal;

import React, { useRef, useState, useEffect } from 'react';
import './BottomSheet.css';

function BottomSheet({ snapPoints = [0, -200, -400] }) {
  const sheetRef = useRef(null);
  const [currentSnap, setCurrentSnap] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const startY = useRef(0);
  const startSnap = useRef(0);

  const toggleSheet = () => {
    const nextSnap = isOpen ? 0 : 1;
    setCurrentSnap(nextSnap);
    setIsOpen(!isOpen);
  };

  const onDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startSnap.current = snapPoints[currentSnap];
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragging);
    document.addEventListener('touchend', onDragEnd);
  };

  const onDragging = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY.current;
    const newTranslate = startSnap.current + diff;
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'none';
      sheetRef.current.style.transform = `translateY(${Math.min(0, newTranslate)}px)`;
    }
  };

  const onDragEnd = (e) => {
    const currentY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const diff = currentY - startY.current;
    let closest = 0;
    let minDist = Infinity;

    snapPoints.forEach((pt, idx) => {
      const dist = Math.abs((startSnap.current + diff) - pt);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });

    setCurrentSnap(closest);
    setIsOpen(closest !== 0);

    document.removeEventListener('mousemove', onDragging);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchmove', onDragging);
    document.removeEventListener('touchend', onDragEnd);
  };

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'transform 0.3s ease';
      sheetRef.current.style.transform = `translateY(${Math.abs(snapPoints[currentSnap])}px)`;
    }
  }, [currentSnap, snapPoints]);
  useEffect(() => {
  const handleKey = (e) => {
    if (e.key === 'ArrowUp') {
      setCurrentSnap((prev) => Math.min(prev + 1, snapPoints.length - 1));
    } else if (e.key === 'ArrowDown') {
      setCurrentSnap((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setCurrentSnap(0); // ⛔ closes the bottom sheet
    }
  };

  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
}, [snapPoints]);


  return (
    <>
      <button className="toggle-button" onClick={toggleSheet}>
        {isOpen ? 'Hide' : 'Show'} Sheet
      </button>

      <div
        ref={sheetRef}
        className="bottom-sheet"
      >
        <div className="handle" onMouseDown={onDragStart} onTouchStart={onDragStart}></div>
        <div className="content">
          <p>This is the Bottom Sheet content.</p>
          <div className="label">Snap Level: {currentSnap}</div> {/* ✅ New line */}
        </div>
      </div>
    </>
  );
}

export default BottomSheet;

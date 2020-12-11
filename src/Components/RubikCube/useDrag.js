import React, {useState, useRef, useEffect, useCallback} from 'react'

const useDrag = (onStart, onDrag, onEnd, blockControls) => {
  const [active, setActive] = useState(false);
  const activeRef = useRef();
  const down = useCallback(
    (e) => (
      setActive(true),
      blockControls(true),
      e.stopPropagation(),
      onStart && onStart(e),
      e.target.setPointerCapture(e.pointerId),
      console.log(e.pointerId)
    ),
    [onStart, blockControls]
  );
  const up = useCallback(
    (e) => (
      setActive(false),
      blockControls(false),
      e.target.releasePointerCapture(e.pointerId),
      onEnd && onEnd(e)
    ),
    [onEnd, blockControls]
  );
  const move = useCallback(
    (e) =>
      activeRef.current &&
      (e.stopPropagation(), onDrag(e)),
    [onDrag]
  );
  useEffect(() => void (activeRef.current = active));
  return [active, { onPointerDown: down, onPointerUp: up, onPointerMove: move }];
}

export default useDrag
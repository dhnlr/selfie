import { useState, useCallback } from "react";

export function useCardRatio(
  initialParams: number
): [number, (height: number | undefined, width: number | undefined) => void] {
  const [aspectRatio, setAspectRatio] = useState<number>(initialParams);

  const calculateRatio = useCallback(
    (height: number | undefined, width: number | undefined) => {
      if (height && width) {
        const isLandscape = height <= width;
        const ratio = isLandscape ? width / height : height / width;

        setAspectRatio(ratio);
      }
    },
    []
  );

  return [aspectRatio, calculateRatio];
}

import { useRef } from 'react';
import { useThreeScene } from './useThreeScene';
import './CoreNetwork.css';

export default function CoreNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useThreeScene(containerRef);

  return (
    <div
      ref={containerRef}
      className="core-network-container"
    />
  );
}

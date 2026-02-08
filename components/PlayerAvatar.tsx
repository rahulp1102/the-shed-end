import React, { useState } from 'react';
import { User } from 'lucide-react';

interface PlayerAvatarProps {
  src?: string;
  alt: string;
  className?: string;
  size?: number; // Size for the fallback generation
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ src, alt, className = '', size = 256 }) => {
  const [error, setError] = useState(false);

  // Generate a Chelsea-themed placeholder using UI Avatars
  // Background: Chelsea Blue (#034694), Text: Chelsea Gold (#C8AA6E)
  const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=034694&color=C8AA6E&size=${size}&font-size=0.33&bold=true`;

  // Determine which source to display
  // If src is empty string, undefined, or if an error occurred, use placeholder
  const displaySrc = !error && src && src.length > 0 ? src : placeholderUrl;

  return (
    <img
      src={displaySrc}
      alt={alt}
      onError={() => setError(true)}
      className={`${className} bg-gray-100 object-cover`}
      loading="lazy"
    />
  );
};

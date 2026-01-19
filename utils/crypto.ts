
/**
 * Generates a SHA-256 hash of the provided content (text or file bytes).
 * This acts as a unique 'Cryptographic Fingerprint' of the digital asset.
 * 
 * Logic:
 * 1. If string, convert to UTF-8 byte array.
 * 2. If ArrayBuffer (file), use as is.
 * 3. Use Web Crypto API to compute digest.
 * 4. Convert buffer to hex string.
 */
export async function generateFingerprint(content: string | ArrayBuffer): Promise<string> {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto API is not available. Ensure you are using HTTPS.");
  }

  const msgUint8 = typeof content === 'string' 
    ? new TextEncoder().encode(content) 
    : new Uint8Array(content);
    
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Formats a timestamp for display.
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
}

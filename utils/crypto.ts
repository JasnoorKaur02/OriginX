
/**
 * Generates a SHA-256 hash of the provided text content.
 * This acts as a unique 'Cryptographic Fingerprint' of the digital asset.
 * 
 * Logic:
 * 1. Convert string to UTF-8 byte array.
 * 2. Use Web Crypto API to compute digest.
 * 3. Convert buffer to hex string.
 */
export async function generateFingerprint(content: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(content);
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

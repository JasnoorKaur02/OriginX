
export interface OriginalityProof {
  id: string;
  fingerprint: string; // The SHA-256 hash
  timestamp: string;   // ISO string or formatted date
  label?: string;      // Optional name for the content
}

export type VerificationStatus = 'IDLE' | 'MATCH' | 'MISMATCH' | 'NOT_FOUND';

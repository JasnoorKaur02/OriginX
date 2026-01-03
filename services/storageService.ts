
import { OriginalityProof } from '../types';

const STORAGE_KEY = 'originx_proofs_v1';

/**
 * Persists a proof of first creation.
 * We ONLY store the fingerprint and the timestamp.
 * We DO NOT store the raw content.
 */
export const saveProof = (proof: OriginalityProof): void => {
  const existing = getStoredProofs();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([proof, ...existing]));
};

/**
 * Retrieves all stored originality proofs.
 */
export const getStoredProofs = (): OriginalityProof[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

/**
 * Finds a proof by its fingerprint.
 */
export const findProofByFingerprint = (fingerprint: string): OriginalityProof | undefined => {
  const proofs = getStoredProofs();
  return proofs.find(p => p.fingerprint === fingerprint);
};

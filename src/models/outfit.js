import { db } from '../firebase-config';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

/**
 * @typedef {Object} outfit
 * @property {string} id
 * @property {string} name
 * @property {Array<clothingItem>} items
 */

/**
 * Creates a new outfit
 * @param {string} name
 * @param {Array<clothingItem>} items
 * @returns {outfit}
 */
export const createOutfit = (name, items) => {
  // implementation
};

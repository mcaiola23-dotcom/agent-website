/**
 * Favorites Hook
 * 
 * Client-side hook for managing saved/favorite listings using localStorage.
 * This provides a local-first experience without requiring authentication.
 */

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'mattcaiola_saved_listings';

export interface UseFavoritesReturn {
    favorites: string[];
    isFavorite: (listingId: string) => boolean;
    toggleFavorite: (listingId: string) => void;
    addFavorite: (listingId: string) => void;
    removeFavorite: (listingId: string) => void;
    clearFavorites: () => void;
}

function getFavoritesFromStorage(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Failed to parse favorites from localStorage:', e);
    }
    return [];
}

function saveFavoritesToStorage(favorites: string[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.warn('Failed to save favorites to localStorage:', e);
    }
}

export function useFavorites(): UseFavoritesReturn {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = getFavoritesFromStorage();
        setFavorites(stored);
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever favorites change (after initialization)
    useEffect(() => {
        if (isInitialized) {
            saveFavoritesToStorage(favorites);
        }
    }, [favorites, isInitialized]);

    const isFavorite = useCallback(
        (listingId: string) => favorites.includes(listingId),
        [favorites]
    );

    const addFavorite = useCallback((listingId: string) => {
        setFavorites((prev) => {
            if (prev.includes(listingId)) return prev;
            return [...prev, listingId];
        });
    }, []);

    const removeFavorite = useCallback((listingId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== listingId));
    }, []);

    const toggleFavorite = useCallback((listingId: string) => {
        setFavorites((prev) => {
            if (prev.includes(listingId)) {
                return prev.filter((id) => id !== listingId);
            }
            return [...prev, listingId];
        });
    }, []);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return {
        favorites,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
    };
}

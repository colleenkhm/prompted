// src/utils/useDailyWord.js
import { useState, useEffect, useCallback } from 'react';

const useDailyWord = () => {
  const [dailyWord, setDailyWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'dailyWord';
  const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const WORDS_API_URL = 'https://raw.githubusercontent.com/unofficial-aiforevery1/english-words/main/words.txt';

  // Get today's date as a string (YYYY-MM-DD)
  const getTodayString = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Get stored word data from localStorage
  const getStoredWordData = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      // Verify the stored data has the expected structure
      if (!parsed || !parsed.word || !parsed.details) {
        console.error('Invalid stored word data');
        return null;
      }
      
      return parsed;
    } catch (error) {
      console.error('Error parsing stored word data:', error);
      return null;
    }
  }, [STORAGE_KEY]);

  // Check if we need a new word
  const needsNewWord = useCallback(() => {
    const stored = getStoredWordData();
    if (!stored) return true;
    return stored.date !== getTodayString();
  }, [getStoredWordData, getTodayString]);

  // Get all definitions from the word data
  const getAllDefinitions = useCallback((wordData) => {
    try {
      if (!wordData || !wordData.details || !wordData.details[0]) {
        console.error('Missing word data structure');
        return null;
      }

      // Check if meanings exists and has items
      if (!wordData.details[0].meanings || !wordData.details[0].meanings.length) {
        console.error('No meanings found in word data');
        return null;
      }

      // Process all meanings and their definitions
      const allDefinitions = [];
      
      for (const meaning of wordData.details[0].meanings) {
        if (meaning.definitions && meaning.definitions.length > 0) {
          // Add all definitions for this part of speech
          const definitionsForType = meaning.definitions.map(def => ({
            partOfSpeech: meaning.partOfSpeech,
            definition: def.definition,
            example: def.example || null
          }));
          
          allDefinitions.push(...definitionsForType);
        }
      }
      
      return allDefinitions.length > 0 ? allDefinitions : null;
    } catch (error) {
      console.error('Error extracting definitions:', error);
      return null;
    }
  }, []);

  // Use a predefined word that we know works
  const getKnownWord = useCallback(() => {
    const knownWords = ['inspiration', 'creativity', 'book', 'writing', 'story'];
    const randomIndex = Math.floor(Math.random() * knownWords.length);
    return knownWords[randomIndex];
  }, []);

  // Fetch word details from the API
  const fetchWordDetails = useCallback(async (word) => {
    try {
      const response = await fetch(`${API_BASE_URL}${word}`);
      
      if (!response.ok) {
        console.error(`API response not OK for word: ${word}, status: ${response.status}`);
        throw new Error(`API request failed for word: ${word}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching word details:', error);
      return null;
    }
  }, [API_BASE_URL]);

  // Store word data in localStorage
  const storeWordData = useCallback((word, details) => {
    try {
      if (!word || !details) {
        console.error('Cannot store incomplete word data');
        return null;
      }
      
      const data = {
        word,
        details,
        date: getTodayString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error storing word data:', error);
      return null;
    }
  }, [STORAGE_KEY, getTodayString]);

  useEffect(() => {
    const fetchDailyWord = async () => {
      try {
        setLoading(true);
        
        // Check if we already have today's word
        if (!needsNewWord()) {
          const stored = getStoredWordData();
          if (stored && stored.word) {
            const allDefinitions = getAllDefinitions(stored);
            
            setDailyWord({
              ...stored,
              allDefinitions
            });
            return;
          }
        }

        // Use a known word
        const word = getKnownWord();

        // Try to fetch details for this word
        const details = await fetchWordDetails(word);
        if (!details) {
          setError('Could not fetch word details');
          return;
        }

        // If we got here, we have a valid word with details
        const wordData = storeWordData(word, details);
        if (wordData) {
          const allDefinitions = getAllDefinitions(wordData);
          
          setDailyWord({
            ...wordData,
            allDefinitions
          });
        } else {
          setError('Failed to store word data');
        }
      } catch (err) {
        setError('Error getting daily word: ' + err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyWord();
  }, [
    needsNewWord, 
    getStoredWordData, 
    getKnownWord, 
    fetchWordDetails, 
    storeWordData, 
    getAllDefinitions
  ]);

  return { dailyWord, loading, error };
};

export default useDailyWord;
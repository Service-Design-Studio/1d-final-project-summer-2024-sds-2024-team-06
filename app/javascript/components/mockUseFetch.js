import { useState, useEffect } from 'react';

const mockUseFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data (Replace this with actual API call when ready)

      const standard_moods = [
        { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
        { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
        { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
        { name: 'Tired', color: 'Black', hexcode: '#000000' },
        { name: 'Content', color: 'Brown', hexcode: '#964B00' },
        { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
        { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
        { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
        { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
        { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
        { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
        { name: 'Confused', color: 'Gray', hexcode: '#808080' },
      ]

      const mockData = [
        {mood: 'in love', color: "Pink", day: 1},
        {mood: 'upset', color: "Dark blue", day: 2},
        {mood: 'angry', color: "Red", day: 3},
        {mood: 'in love', color: "Pink", day: 5},
        {mood: 'meh', color: "Bright blue", day: 7},
        {mood: 'happy', color: "Lime green", day: 11},
        {mood: 'unhappy', color: "Navy blue", day: 12},
        {mood: 'content', color: "Brown", day: 13},
        {mood: 'tired', color: "Black", day: 15},
        {mood: 'excited', color: "Neon green", day: 17},
        {mood: 'in love', color: "Pink", day: 364},
        {mood: 'upset', color: "Dark blue", day: 22},
        {mood: 'angry', color: "Red", day: 33},
        {mood: 'in love', color: "Pink", day: 34},
        {mood: 'content', color: "Brown", day: 37},
        {mood: 'content', color: "Brown", day: 38},
        {mood: 'meh', color: "Bright blue", day: 27},
        {mood: 'happy', color: "Lime green", day: 211},
        {mood: 'unhappy', color: "Navy blue", day: 122},
        {mood: 'content', color: "Brown", day: 132},
        {mood: 'tired', color: "Black", day: 215},
        {mood: 'excited', color: "Neon green", day: 365},
        // Add more mock data as needed
      ];

      setData(mockData);
      setIsPending(false);
      setError(null);

      // Uncomment the lines below when the API is ready
      // try {
      //   const response = await fetch(url);
      //   if (!response.ok) {
      //     throw new Error('Could not fetch the data for that resource');
      //   }
      //   const data = await response.json();
      //   setData(data);
      //   setIsPending(false);
      //   setError(null);
      // } catch (err) {
      //   setIsPending(false);
      //   setError(err.message);
      // }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default mockUseFetch;

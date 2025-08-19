  export const generateUnixTimestampId = (randomLength = 6, delimiter = '-', useHex = false) => {
    const timestamp = Math.floor(Date.now() / 1000);
    
    let randomSuffix;
    
    if (useHex) {
      randomSuffix = '';
      const hexChars = '0123456789abcdef';
      
      if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const buffer = new Uint8Array(randomLength);
        window.crypto.getRandomValues(buffer);
        for (let i = 0; i < randomLength; i++) {
          randomSuffix += hexChars[buffer[i] % 16];
        }
      } else {
        for (let i = 0; i < randomLength; i++) {
          randomSuffix += hexChars[Math.floor(Math.random() * 16)];
        }
      }
    } else {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const buffer = new Uint8Array(randomLength);
        window.crypto.getRandomValues(buffer);
        randomSuffix = Array.from(buffer)
          .map(b => (b % 10).toString())
          .join('')
          .slice(0, randomLength);
      } else {
        randomSuffix = Math.random().toString().substring(2, 2 + randomLength);
        while (randomSuffix.length < randomLength) {
          randomSuffix += Math.random().toString().substring(2);
        }
        randomSuffix = randomSuffix.substring(0, randomLength);
      }
    }
    return `${timestamp}${delimiter}${randomSuffix}`;
  }
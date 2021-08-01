import md5 from 'md5';

const condense = (text: Record<string, any>[]) => {
  return text.reduce((acc: Record<string, any>[], chunk) => {
    if (chunk.type === 'paragraph_start') {
      acc.push({
        type: 'paragraph',
        chunks: [],
      });
    }

    if (chunk.type === 'stanza_start') {
      acc.push({
        type: 'stanza',
        chunks: [],
      });
    }

    if (chunk.type.includes('_text')) {
      const lastIdx = acc.length - 1;
      acc[lastIdx].chunks.push(chunk);
    }

    if (chunk.type.includes('_end')) {
      const lastIdx = acc.length - 1;
      acc[lastIdx].id = md5(JSON.stringify(acc[lastIdx]));
    }

    return acc;
  }, []);
};

export default condense;

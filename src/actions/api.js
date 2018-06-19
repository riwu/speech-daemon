import axios from 'axios';

const [post] = ['post'].map(method => (path, data, options) =>
  axios({
    method,
    url: path,
    data,
    ...options,
  }).then(response => response.data));

const GOOGLE_API_KEY_PARAM = `?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

export const getEntities = content =>
  post(`https://language.googleapis.com/v1beta2/documents:analyzeEntities${GOOGLE_API_KEY_PARAM}`, {
    document: {
      type: 'PLAIN_TEXT',
      content,
    },
  });

export const getClassification = content =>
  post(`https://language.googleapis.com/v1beta2/documents:classifyText${GOOGLE_API_KEY_PARAM}`, {
    document: {
      type: 'PLAIN_TEXT',
      content,
    },
  });

export const getTranslation = (content, languageCode) =>
  post(`https://translation.googleapis.com/language/translate/v2${GOOGLE_API_KEY_PARAM}&target=${languageCode}&q=${encodeURIComponent(content)}`);

export const speechToText = content =>
  post(`https://speech.googleapis.com/v1/speech:recognize${GOOGLE_API_KEY_PARAM}`, {
    config: {
      encoding: 'AMR',
      sampleRateHertz: 8000,
      languageCode: 'en-US',
    },
    audio: { content },
  });

export const getSummarization = text =>
  post('https://api.algorithmia.com/v1/web/algo/nlp/Summarizer/0.1.7', text, {
    headers: {
      Authorization: process.env.REACT_APP_SUMMARIZATION_KEY,
      'Content-Type': 'text/plain',
    },
  });

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method to put content into the IndexedDB database using the idb module
export const putDb = async (content) => {
  try {
    // Logging a message to indicate that we are attempting to put data into the database
    console.log('PUT to the database');
    
    // Opening the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    
    // Starting a new transaction on the 'jate' object store with readwrite access
    const tx = jateDb.transaction('jate', 'readwrite');
    
    // Getting a reference to the 'jate' object store
    const store = tx.objectStore('jate');
    
    // Putting the data into the 'jate' object store using a 'put' operation.
    // Here, { id: 1, value: content } is the data being stored, and 'id' is the key.
    const request = store.put({ id: 1, value: content });
    
    // Waiting for the 'put' operation to complete successfully
    await request;
    
    // Logging a message to indicate that the data has been successfully saved to the database
    console.log('Data saved to the database', content);
  } catch (error) {
    // Handling any errors that occurred during the database operation
    console.error('Error putting data into the database', error);
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  
}

initdb();

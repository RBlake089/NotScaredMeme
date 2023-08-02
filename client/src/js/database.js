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
// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  try {
    // Logging a message to indicate that we are attempting to get data from the database
    console.log('GET from the database');
    
    // Opening the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    
    // Starting a new transaction on the 'jate' object store with readonly access
    const tx = jateDb.transaction('jate', 'readonly');
    
    // Getting a reference to the 'jate' object store
    const store = tx.objectStore('jate');
    
    // Getting the data from the 'jate' object store using the key '1'
    const request = store.get(1);
    
    // Waiting for the 'get' operation to complete and obtain the result
    const result = await request;
    
    // Checking if the result is not null (data found in the database)
    if (result) {
      // Logging a message to indicate that the data has been successfully retrieved from the database
      console.log('Data retrieved from the database', result.value);
      
      // Returning the retrieved data
      return result.value;
    } else {
      // Logging a message to indicate that the data was not found in the database
      console.log('Data not found in the database');
      
      // Returning null to indicate that no data was found
      return null;
    }
  } catch (error) {
    // Handling any errors that occurred during the database operation
    console.error('Error getting data from the database', error);
    
    // Returning null in case of an error
    return null;
  }
};



initdb();

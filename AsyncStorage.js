import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store a JavaScript object
export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Object successfully saved');
  } catch (e) {
    console.error('Failed to save the object to storage', e);
  }
};

// Function to retrieve a JavaScript object
export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      const value = JSON.parse(jsonValue);
      console.log('Object retrieved:', value);
      return value;
    }
  } catch (e) {
    console.error('Failed to fetch the object from storage', e);
  }
};

//Things to store: Number of points/ answered questions/ date of when last question was answered
/**  
 * 
 * [2,0,1]    //Simple/Medium/Hard

2-means answered wrong

1-means answered correctly

0-means not answered

Alevel/SAT/Integral/Differentiation/Trigonometry
 * 
 * 
 * 
 * 
 *  EXAMPLE USAGE
 * const myObject = {
  name: 'John Doe',
  age: 30,
  email: 'john.doeexample.com'
};

// Storing the object
await storeObject('userProfile', myObject);

// Retrieving the object
const retrievedObject = await getObject('userProfile');
console.log(retrievedObject);
 * 
 * 
 * 
 * 
 */
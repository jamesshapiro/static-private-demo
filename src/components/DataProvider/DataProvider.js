import React from 'react';

// Note: replace "Data" with the name of the thing being provided.
// For usage, see the "DataContextUser" component.

export const DataContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function DataProvider({ children }) {
  const randomItem = 'random item';
  const [items, setItems] = React.useState([]);
  const [apiWasRequested, setApiWasRequested] = React.useState(false);
  const [requestWasHandled, setRequestWasHandled] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const payload = {
        'key': 'value'
      };

      const request = new Request(ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY 
        },
        body: JSON.stringify(payload),
        timeout: 100000,
      });
      console.log(`API Was Requested!`)
      console.log(`${ENDPOINT} ${API_KEY}`)
      
      const response = await fetch(request);
      const json = await response.json();
      console.log(json)
      return json;
    }
    console.log('data fetch requested')
    console.log(`apiWasRequested: ${apiWasRequested} && requestWasHandled: ${requestWasHandled}`)
    if (apiWasRequested && !requestWasHandled) {
      fetchData();
      setApiWasRequested(false)
      setRequestWasHandled(true)
    }
  }, [apiWasRequested, requestWasHandled]);


  

  function createItem(content, variant) {
    const nextItems = [
      ...items,
      {
        id: crypto.randomUUID(),
        content,
        variant,
      },
    ];

    setItems(nextItems);
  }

  function clearItem(id) {
    const nextItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(nextItems);
  }

  return (
    <DataContext.Provider
      value={{
        items,
        createItem,
        clearItem,
        randomItem,
        setApiWasRequested,
        setRequestWasHandled
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;

export const fetchData = (url: string) => {
  if (url === '/planets') {
    return fetchPlanets();
  } else if (url.startsWith('/planets/')) {
    const match = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
    if (!match || !match[1] || !match[1].length) {
      throw Error(
        'Expected URL like "/planets/earth/places". Received: "' + url + '".'
      );
    }
    return fetchPlaces(match[1]);
  }
  throw Error(
    'Expected URL like "/planets" or "/planets/earth/places". Received: "' +
      url +
      '".'
  );
};

export const fetchPlanets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'earth',
          name: 'Earth',
        },
        {
          id: 'venus',
          name: 'Venus',
        },
        {
          id: 'mars',
          name: 'Mars',
        },
      ]);
    }, 1000);
  });
};

export const fetchPlaces = (planetId: string) => {
  if (typeof planetId !== 'string') {
    throw Error(
      'fetchPlaces(planetId) expects a string argument. ' +
        'Instead received: ' +
        planetId +
        '.'
    );
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (planetId === 'earth') {
        resolve([
          {
            id: 'laos',
            name: 'Laos',
          },
          {
            id: 'spain',
            name: 'Spain',
          },
          {
            id: 'vietnam',
            name: 'Vietnam',
          },
        ]);
      } else if (planetId === 'venus') {
        resolve([
          {
            id: 'aurelia',
            name: 'Aurelia',
          },
          {
            id: 'diana-chasma',
            name: 'Diana Chasma',
          },
          {
            id: 'kumsong-vallis',
            name: 'Kŭmsŏng Vallis',
          },
        ]);
      } else if (planetId === 'mars') {
        resolve([
          {
            id: 'aluminum-city',
            name: 'Aluminum City',
          },
          {
            id: 'new-new-york',
            name: 'New New York',
          },
          {
            id: 'vishniac',
            name: 'Vishniac',
          },
        ]);
      } else throw Error('Uknown planet ID: ' + planetId);
    }, 1000);
  });
};

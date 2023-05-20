/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

export const Page = () => {
  const [planetList, setPlanetList] = useState([]);
  const [planetId, setPlanetId] = useState('');

  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    let ignore = false;
    void fetchData('/planets').then((result: any) => {
      if (!ignore) {
        console.log('Fetched a list of planets.');
        setPlanetList(result);
        setPlanetId(result[0].id); // Select the first planet
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  // Add
  useEffect(() => {
    if (planetId === '') {
      // Nothing is selected in the first box yet
      return;
    }

    let ignore = false;
    void fetchData('/planets/' + planetId + '/places').then((result: any) => {
      if (!ignore) {
        console.log('Fetched a list of places on "' + planetId + '".');
        setPlaceList(result);
        setPlaceId(result[0].id); // Select the first place
      }
    });
    return () => {
      ignore = true;
    };
  }, [planetId]);

  return (
    <>
      <label>
        Pick a planet:{' '}
        <select
          value={planetId}
          onChange={(e) => {
            setPlanetId(e.target.value);
          }}
        >
          {planetList.map((planet) => (
            <option key={planet.id} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select
          value={placeId}
          onChange={(e) => {
            setPlaceId(e.target.value);
          }}
        >
          {placeList.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <hr />
      <p>
        You are going to:{' '}
        {placeId
          ? placeList.find((place: any) => place.id === placeId)?.name
          : '...'}{' '}
        on{' '}
        {planetId
          ? planetList.find((planet: any) => planet.id === planetId)?.name
          : '...'}{' '}
      </p>
    </>
  );
};

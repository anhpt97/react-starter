import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

export const useSelectOptions = (url: string) => {
  const [list, setList] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  useEffect(() => {
    if (url === null) {
      return;
    }

    let ignore = false;
    void fetchData(url).then((result) => {
      if (!ignore) {
        setList(result);
        setSelectedId(result[0].id);
      }
    });
    return () => {
      ignore = true;
    };
  }, [url]);
  return [list, selectedId, setSelectedId];
};

export const Page = () => {
  const [planetList, planetId, setPlanetId] = useSelectOptions('/planets');

  const [placeList, placeId, setPlaceId] = useSelectOptions(
    planetId ? `/planets/${planetId}/places` : null
  );

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
          {planetList?.map((planet: any) => (
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
          {placeList?.map((place: any) => (
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

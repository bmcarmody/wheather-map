import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import { useAppValue } from '../../store/AppContext';
import { setMap } from '../../store/actions/AppActions';

const MAPBOX_API_KEY = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
const MapboxMap = ReactMapboxGl({
  accessToken: MAPBOX_API_KEY
});

const Map = () => {
  const [store, dispatch] = useAppValue();
  const [tempMap, setTempMap] = useState(0);

  useEffect(() => {
    setMap(tempMap)(dispatch);
  }, [tempMap, dispatch]);

  return (
    <div className="map">
      <MapboxMap
        style="mapbox://styles/mapbox/outdoors-v10" //eslint-disable-line
        ref={map => {
          setTempMap(map);
        }}
      >
        {store.position !== undefined && (
          <Marker coordinates={store.position} anchor="bottom">
            <div className="pin" />
            <div className="pulse" />
          </Marker>
        )}
      </MapboxMap>
    </div>
  );
};

export default Map;

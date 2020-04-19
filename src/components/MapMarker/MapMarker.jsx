import React from "react";
import { Marker, Popup } from "react-map-gl";

import styles from "./MapMarker.module.css";

const MapMarker = (props) => {
  return (
    <div>
      {props.logEntries.map((entry) => (
        <React.Fragment key={entry.uid}>
          <Marker
            latitude={entry.lat}
            longitude={entry.long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <svg
              className={styles.marker}
              style={{
                height: `${12 * props.viewport.zoom}`,
                width: `${12 * props.viewport.zoom}`,
              }}
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => {
                props.setShowPopUp({
                  [entry.uid]: true,
                });
              }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          {props.showPopUp[entry.uid] ? (
            <Popup
              latitude={entry.lat}
              longitude={entry.long}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => {
                props.setShowPopUp({});
              }}
              anchor="top"
            >
              <div className="popup">
                <h3>
                  Place Name:
                  {entry.provinceState}
                  {entry.provinceState ? ", " : null}
                  {entry.countryRegion}
                </h3>
                <p>Confirmed: {entry.confirmed}</p>
                <p>Recovered: {entry.recovered}</p>
                <p>Deaths: {entry.deaths}</p>
                <p>Active Case: {entry.active}</p>
                <p>
                  Last Updates:{" "}
                  {new Date(entry.lastUpdate).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MapMarker;

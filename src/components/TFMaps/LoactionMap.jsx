import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useEffect } from "react";

const MapContainer = (props) => {
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });


    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    };

    const onClose = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            })
    }, []);
    return (
        <div style={{ width: "100%", height: "400px" }}> {/* Specify a height for the map */}
            <Map
                google={props.google}
                zoom={10}
                initialCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
                style={{ width: "95%", height: "80%", borderRadius: "8px" }}
            >
                <Marker
                    onClick={onMarkerClick}
                    name={"Basaratpur"}
                    position={{ lat: coordinates.lat + 1, lng: coordinates.lng - 1 }}
                />
                <Marker
                    onClick={onMarkerClick}
                    name={"Basaratpur"}
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                />
                <Marker
                    onClick={onMarkerClick}
                    name={"Basaratpur"}
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                />
                <Marker
                    onClick={onMarkerClick}
                    name={"Basaratpur"}
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    onClose={onClose}
                >
                    <div>
                        <h4>{selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyD-_p4x8ysVeIqV1H92viTaonxkBW80QYA",
})(MapContainer);

import React from 'react';
import {Link} from 'react-router-dom';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import {FiPlus, FiArrowRight} from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    <strong>Manaus</strong>
                    <span>Amazonas</span>
                </footer>
            </aside>

            <Map
                center={[-3.0777533,-60.0189982]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                    icon={mapIcon}
                    position={[-3.0777533,-60.0189982]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        SHOW!!
                        <Link to="/orphanage/1">
                            <FiArrowRight size={25} color="#FFF" />
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap

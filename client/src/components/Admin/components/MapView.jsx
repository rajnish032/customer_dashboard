"use client"

import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DataContext } from '../../../Contexts/Admin'

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from '../../../assets/icon.png';
import icon2 from '../../../assets/icon2.png';
import Link from 'next/link';
import { Skeleton } from 'antd';


const MapView = ({users}) => {
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords?.latitude,
                        longitude: position.coords?.longitude,
                    });
                    setLoading(false);
                },
                (error) => {
                    setError("Error fetching user location. Please ensure that you have given access for the location.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    const userIcon = L.icon({
        iconUrl: icon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const createAgentIcon = (avatarUrl) => {
        return L.icon({
            iconUrl: avatarUrl || icon2,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            className: avatarUrl ? 'rounded-full  ring ring-blue-700' : '', 
        });
    };

    return (
        <div className="relative rounded-lg overflow-clip">
            {loading && <Skeleton active />}
            {!userLocation && <p className='text-red-500 text-center'>Kindly Turn on the Location & refresh</p>}
            {userLocation && (
                <MapContainer
                    center={[userLocation?.latitude, userLocation?.longitude]}
                    zoom={3}
                    style={{ height: "500px", width: "100%", margin: "auto auto" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[userLocation?.latitude, userLocation?.longitude]} icon={userIcon}>
                        <Popup>
                            <div>
                                <h3>Your Location</h3>
                                <p>Latitude: {userLocation?.latitude}</p>
                                <p>Longitude: {userLocation?.longitude}</p>
                            </div>
                        </Popup>
                    </Marker>
                    {users?.map((agent) => (
                        <>
                            <Marker
                                key={agent._id}
                                position={[parseFloat(agent?.coordinates?.lat) || 0, parseFloat(agent?.coordinates?.lon) || 0]}
                                icon={createAgentIcon(agent?.avatar)}
                            >
                                <Popup>
                                    <div>
                                        <h3>{agent?.fullName}</h3>
                                        <p>Role: {agent?.role}</p>
                                        <p>Contact: {agent?.phone?.countryCode} {agent?.phone?.number}</p>
                                        <p>Location: {agent?.city}, {agent?.state}</p>
                                        <Link href={`/admin/user/${agent.role}/${agent.fullName}/${agent._id}`} state={agent} >
                                            <button className='bg-blue-500 mx-auto p-1 my-1 block text-white w-[80%] font-semibold'>View Profile</button>
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                            {agent.basicDetails?.serviceRange && (
                                <Circle
                                    center={[parseFloat(agent?.coordinates?.lat) || 0, parseFloat(agent?.coordinates?.lon) || 0]}
                                    radius={(agent?.basicDetails?.serviceRange*2)*3.14 } 
                                    color="blue"
                                    fillColor="blue"
                                    fillOpacity={0.1}
                                />
                            )}
                        </>
                    ))}
                </MapContainer>
            )}
        </div>
    );
};




export default MapView;

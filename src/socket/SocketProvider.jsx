import React, { createContext, useContext, useEffect } from 'react'
import socket from './socket'
import { useAuth } from '../context/AuthContext'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const { user } = useAuth()

    useEffect(() => {
        if (user && user._id) {
            socket.connect();

            const onConnect = () => {
                socket.emit("register", user._id, user.role);
            };

            socket.on("connect", onConnect);

            // If already connected (e.g. during re-renders), register immediately
            if (socket.connected) {
                onConnect();
            }

            return () => {
                socket.off("connect", onConnect);
                socket.disconnect();
            };
        }
    }, [user, socket]);
    return (
        <div>
            <SocketContext.Provider value={socket}>
                {children}
            </SocketContext.Provider>
        </div>
    )
}

export const useSocket = () => useContext(SocketContext)
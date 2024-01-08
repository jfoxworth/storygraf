// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const UserPointsDialog = ({ currentItem, setCurrentItem, thisTag }) => {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API
  const defaultLat = thisTag.data?.mapData?.lat || 38
  const defaultLng = thisTag.data?.mapData?.lng || 270
  const defaultZoom = thisTag.data?.mapData?.zoom || 4
  return (
    <>
      <Typography sx={{ mb: 3 }}>Click on the map below to select the location for the item</Typography>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Map
          zoom={defaultZoom}
          center={{ lat: defaultLat, lng: defaultLng }}
          mapId={`${currentItem.PK}map`}
          onClick={ev => {
            setCurrentItem({
              ...currentItem,
              data: { ...currentItem.data, mapData: { lat: ev.detail.latLng.lat, lng: ev.detail.latLng.lng } }
            })
          }}
        >
          {/* https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker*/}
          {currentItem.data?.mapData?.lat && (
            <AdvancedMarker position={{ lat: currentItem.data?.mapData?.lat, lng: currentItem.data?.mapData?.lng }}>
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </>
  )
}

export default UserPointsDialog

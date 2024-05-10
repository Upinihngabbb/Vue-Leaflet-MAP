<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" :zoom="zoom" :center="circlePosition">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker
        :lat-lng="markerPosition"
        @update:lat-lng="updateMarkerPosition"
        draggable="true"
      />
      <l-circle
        :lat-lng="circlePosition"
        :radius="circleRadius"
        :color="circleColor"
      />
    </l-map>
  </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LCircle } from "@vue-leaflet/vue-leaflet";
import { ref, watch } from "vue";
import L from "leaflet"; // Ensure Leaflet is imported

const zoom = ref(13);
const markerPosition = ref([47.41322, -1.219482]); // Initial marker position
const circlePosition = ref([47.41322, -1.219482]); // Circle center position
const circleRadius = ref(2000); // Circle radius in meters
const circleColor = ref("red"); // Initial circle color
const alertShown = ref(false); // To track if the alert has been shown

// Function to update the marker position and check the distance
const updateMarkerPosition = (newPosition) => {
  markerPosition.value = newPosition;

  // Calculate the distance between the marker and the circle's center
  const from = L.latLng(circlePosition.value);
  const to = L.latLng(newPosition);
  const distance = from.distanceTo(to); // Distance in meters

  // If the marker is within 2000 meters of the circle's center, change the color
  if (distance <= 2000) {
    circleColor.value = "green"; // Marker is within the circle

    // Show an alert if it hasn't been shown yet
    if (!alertShown.value) {
      alert("User is near the zone!");
      alertShown.value = true; // Prevent the alert from being shown again
    }
  } else {
    circleColor.value = "red"; // Marker is outside the circle
    alertShown.value = false; // Reset the alert shown status if the marker moves out of the zone
  }
};

watch(
  markerPosition,
  (newPosition) => {
    updateMarkerPosition(newPosition);
  },
  { deep: true }
);
</script>

<style>
/* Optional: additional styles */
</style>

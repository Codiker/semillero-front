<template>
  <BaseLayout>
    <h2 class="mb-4 text-xl font-bold">Reporte de Actividades</h2>
    <div v-if="isLoading" class="mb-4">Cargando actividades...</div>
    <div v-else-if="error" class="mb-4 text-red-600">{{ error }}</div>
    <table v-else class="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Nombre</th>
          <th class="py-2 px-4 border-b">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividad in activities || []" :key="actividad.id">
          <td class="py-2 px-4 border-b">{{ actividad.nombre }}</td>
          <td class="py-2 px-4 border-b">{{ actividad.fecha }}</td>
        </tr>
        <tr v-if="!(activities && activities.length)">
          <td colspan="2" class="py-2 px-4 text-center">No hay actividades registradas.</td>
        </tr>
      </tbody>
    </table>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { onMounted } from 'vue'
import { useReportsStore } from '@/modules/reports/store'
import { storeToRefs } from 'pinia'

const reportsStore = useReportsStore()
const { activities, isLoading, error } = storeToRefs(reportsStore)

onMounted(() => {
  reportsStore.fetchActivities()
})
</script>
  
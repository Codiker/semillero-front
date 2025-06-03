<template>
  <BaseLayout>
    <h2 class="mb-6 text-2xl font-bold text-gray-800">Reporte de Actividades</h2>
    <div class="mb-6 flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">Nombre</label>
        <input v-model="filtroNombre" type="text" placeholder="Buscar por nombre" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 w-48 text-sm outline-none transition" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">Fecha desde</label>
        <input v-model="filtroFechaDesde" type="date" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-500 mb-1">Fecha hasta</label>
        <input v-model="filtroFechaHasta" type="date" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition" />
      </div>
      <button @click="limpiarFiltros" class="ml-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-200 transition">Limpiar</button>
    </div>
    <div v-if="isLoading" class="mb-4 text-blue-600 text-center">Cargando actividades...</div>
    <div v-else-if="error" class="mb-4 text-red-500 text-center">{{ error }}</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-xl shadow border border-gray-100">
        <thead>
          <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <th class="py-3 px-4 text-left font-semibold">Nombre</th>
            <th class="py-3 px-4 text-left font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actividad in actividadesFiltradas" :key="actividad.id" class="hover:bg-blue-50 transition">
            <td class="py-3 px-4 border-b border-gray-100">{{ actividad.nombre }}</td>
            <td class="py-3 px-4 border-b border-gray-100">{{ actividad.fecha }}</td>
          </tr>
          <tr v-if="actividadesFiltradas.length === 0">
            <td colspan="2" class="py-4 px-4 text-center text-gray-400">No hay actividades registradas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { onMounted, ref, computed } from 'vue'
import { useReportsStore } from '@/modules/reports/store'
import { storeToRefs } from 'pinia'

const reportsStore = useReportsStore()
const { activities, isLoading, error } = storeToRefs(reportsStore)

const filtroNombre = ref('')
const filtroFechaDesde = ref('')
const filtroFechaHasta = ref('')

const limpiarFiltros = () => {
  filtroNombre.value = ''
  filtroFechaDesde.value = ''
  filtroFechaHasta.value = ''
}

const actividadesFiltradas = computed(() => {
  let lista = activities.value || []
  if (filtroNombre.value) {
    lista = lista.filter(a => a.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase()))
  }
  if (filtroFechaDesde.value) {
    lista = lista.filter(a => a.fecha >= filtroFechaDesde.value)
  }
  if (filtroFechaHasta.value) {
    lista = lista.filter(a => a.fecha <= filtroFechaHasta.value)
  }
  return lista
})

onMounted(() => {
  reportsStore.fetchActivities()
})
</script>
  
<template>
  <div v-if="show" class="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-30">
    <div class="bg-transparent p-6 flex flex-col items-center">
      <span class="loader"></span>
      <p class="mt-4 text-gray-700">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message?: string
}>()
</script>

<style scoped>
.loader {
  position: relative;
  width: 120px;
  height: 140px;
  background-image: radial-gradient(circle 30px, #1e2838 100%, transparent 0),
    radial-gradient(circle 5px, #1e2838 100%, transparent 0),
    radial-gradient(circle 5px, #1e2838 100%, transparent 0),
    linear-gradient(#1e2838 20px, transparent 0);
  background-position: center 127px, 94px 102px, 16px 18px, center 114px;
  background-size: 60px 60px, 10px 10px, 10px 10px, 4px 14px;
  background-repeat: no-repeat;
  z-index: 10;
  perspective: 500px;
}

.loader::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #1e2838;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%) rotate(-45deg);
  border-right-color: transparent;
  box-sizing: border-box;
}

.loader::after {
  content: '';
  position: absolute;
  height: 80px;
  width: 80px;
  transform: translate(-50%, -55%) rotate(-45deg) rotateY(0deg);
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  border: 7px solid #FF3D00;
  border-radius: 50%;
  animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  to {
    transform: translate(-50%, -55%) rotate(-45deg) rotateY(360deg)
  }
}
</style>
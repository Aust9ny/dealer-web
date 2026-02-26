<template>
  <div class="chart-container" style="position: relative; height: 400px; width: 100%;">
    <Line 
      v-if="computedChartData.datasets.length > 0"
      :data="computedChartData" 
      :options="chartOptions" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, 
  LineElement, PointElement, CategoryScale, LinearScale, Filler 
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, Filler, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps<{
  labels: string[]; // หัวข้อของข้อมูล ใดๆ
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[]; // ข้อมูลของหัวข้อ ใดๆ
}>();

const computedChartData = computed(() => ({
  labels: props.labels || [],
  datasets: props.datasets || []
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true }
  }
};
</script>
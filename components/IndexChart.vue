<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
// 1. นำเข้า Line แทน Bar
import { Line } from 'vue-chartjs';
// 2. นำเข้า LineElement และ PointElement เพิ่มเติม
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  LineElement,   // เพิ่มอันนี้
  PointElement,  // เพิ่มอันนี้
  CategoryScale, 
  LinearScale, 
  Filler
} from 'chart.js';

// 3. Register ส่วนประกอบใหม่
ChartJS.register(Title, Tooltip, Legend, Filler, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: 'LineChart',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'],
        datasets: [
          {
            label: 'ยอดขายสะสม',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: '#A855F7', // สีของเส้นเชื่อม
            data: [40, 20, 12, 39, 10 ,100, 160,200,360],
            fill: true,            // ถ้าไม่อยากให้มีสีระบายใต้เส้น
            tension: 0.1,           // ความโค้งของเส้น (0 = เส้นตรงเป๊ะ)
            pointRadius: 5,         // ขนาดของจุด (Dot)
            pointHoverRadius: 8 ,    // ขนาดจุดเวลาเอาเมาส์ไปชี้
          },
          {
      label: 'ปี 2026 (เป้าหมาย)',
      data: [50, 35, 55, 45, 80, 95],
      borderColor: '#3b82f6', // เส้นสีฟ้า
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // พื้นที่สีฟ้าจาง
      fill: true,
      tension: 0.4
    }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }
};
</script>
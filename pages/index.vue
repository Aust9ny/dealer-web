<script setup lang="ts">
import type { Product , } from '~/types/product';
import type { Banner } from '~/types/banner';
import type { News } from '~/types/news';

const banner1 = ref<Banner[]>([
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Next-Gen GPU Architecture Update' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Cybersecurity & Tech Infrastructure News' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Latest Semi-conductor Technology' 
  },
]);

const banner2 = ref<Banner[]>([
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'AI & Machine Learning Breakthroughs' 
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Cloud Computing & Server Solutions' 
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Future Tech & Smart Innovation' 
  },
]);

const products = ref<Product[]>([
  { id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 2, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 3, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 4, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 5, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 6, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 10, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  // ... (Keep your original product list here)
]);

const newList = ref<News[]>([
  { id: 1, title: 'New GPU Release', link: '#', description: 'The latest GPU has been released with amazing features.', date: '2024-06-01', image: 'https://example.com/news1.jpg', alt: 'GPU Release' },
  { id: 2, title: 'Tech Conference 2024', link: '#', description: 'Join us at the annual tech conference to explore new innovations.', date: '2024-05-20', image: 'https://example.com/news2.jpg', alt: 'Tech Conference' },
  // ... (Add more news items as needed)
]);

const categoryTitle = computed(() => {
  return products.value.length > 0 ? products.value[0].category : 'Products';
});
</script>
<template>
  <div class="min-h-screen bg-[#F8FCF8] py-4 px-2 md:px-6">
     <div class="mx-auto max-w-1400px"> 
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        
        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div class="aspect-4/1 w-full"> 
            <PromotionBanner :banners="banner1" />
          </div>
        </div>

        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div class="aspect-4/1 w-full"> 
            <PromotionBanner :banners="banner2" />
          </div>
        </div>
        
      </div>

      <div class="mt-4">
        <ProductList 
          :title="categoryTitle"
          :products="products" 
        />
      </div>
      <div class="mt-12">
        <FooterNews :news-list="newList" />
    </div>
  </div>
  </div>
</template>
<style scoped>
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
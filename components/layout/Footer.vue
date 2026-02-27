<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useNavigation } from '@/composables/dashboard/useNavigation';
const { menuGroups } = useNavigation();
const getGroup = (title: string) =>
  menuGroups.find(g => g.title === title);
</script>

<template>
  <footer class="bg-white border-t border-slate-300">
    <div
      class="max-w-screen-2xl mx-auto pl-8 pr-4 md:px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-8"
    >
      <!-- Column 1 -->
      <div class="space-y-4">
        <div class="text-3xl font-bold text-[#0D95DA]">
          Advice <br />
          <span class="text-green-500 italic">Dealers</span>
        </div>
        <div class="mt-2 h-0.5 w-85 bg-gray-200" />
        <p class="font-bold text-[#0D95DA] text-xl leading-8 tracking-wide">
          “แอดไวซ์ ศูนย์รวมเทคโนโลยี <br />
          ไลฟ์สไตล์ ไอที สมาร์ทโฟน”
        </p>

        <p class="text-gray-500 text-xs leading-relaxed">
          จำหน่ายและซ่อม ครบ จบ ในที่เดียว “มากกว่าร้านขายคอม” <br />
          เพราะเราคือ “Lifestyle IT Community” <br />
          มีสาขาครอบคลุมทั่วไทย, สปป.ลาว และ Online จะซื้อ จะซ่อม จะขาย
          <br />
          พูดคุยทุกเรื่องราวไอที ครบ จบ ในที่เดียว
        </p>
      </div>

      <!-- Column 2 -->
      <div class="space-y-8">
        <!-- ระบบการสั่งซื้อ -->
        <div v-if="getGroup('ระบบการสั่งซื้อ')">
          <h3 class="font-semibold mb-2 text-gray-900">
            ระบบการสั่งซื้อ
          </h3>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />

          <ul class="mt-3 space-y-2">
            <li
              v-for="link in getGroup('ระบบการสั่งซื้อ')?.links"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </NuxtLink>

              <a
                v-else
                :href="link.to"
                target="_blank"
                rel="noopener"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- รายงาน -->
        <div>
          <h4 class="font-semibold mb-2 text-gray-900">รายงาน</h4>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />
          <ul class="mt-3 space-y-2">
            <li>รายงานยอดขาย</li>
            <li>รายงานการสั่งซื้อ</li>
          </ul>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="space-y-8">
        <!-- การเงินและชำระเงิน -->
        <div v-if="getGroup('การเงินและชำระเงิน')">
          <h3 class="font-semibold mb-2 text-gray-900">
            การเงินและชำระเงิน
          </h3>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />

          <ul class="space-y-2 mt-4">
            <li
              v-for="link in getGroup('การเงินและชำระเงิน')?.links"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </NuxtLink>

              <a
                v-else
                :href="link.to"
                target="_blank"
                rel="noopener"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- สื่อการขายและโปรโมชั่น -->
        <div v-if="getGroup('สื่อการขายและโปรโมชั่น')">
          <h4 class="font-semibold mb-2 text-gray-900">
            สื่อการขายและโปรโมชั่น
          </h4>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />

          <ul class="space-y-2 mt-4">
            <li
              v-for="link in getGroup('สื่อการขายและโปรโมชั่น')?.links"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </NuxtLink>

              <a
                v-else
                :href="link.to"
                target="_blank"
                rel="noopener"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Column 4 -->
      <div class="space-y-8">
        <!-- ติดตามสถานะและเคลม -->
        <div v-if="getGroup('ติดตามสถานะและเคลม')">
          <h3 class="font-semibold mb-2 text-gray-900">
            ติดตามสถานะและเคลม
          </h3>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />

          <ul class="space-y-2 mt-4">
            <li
              v-for="link in getGroup('ติดตามสถานะและเคลม')?.links"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </NuxtLink>

              <a
                v-else
                :href="link.to"
                target="_blank"
                rel="noopener"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- เงื่อนไข -->
        <div v-if="getGroup('ข้อมูลและการตั้งค่า')">
          <h4 class="font-semibold mb-2 text-gray-900">เงื่อนไข</h4>
          <div class="mt-2 h-0.5 w-full max-w-xs bg-gray-200" />

          <ul class="space-y-2 mt-4">
            <li
              v-for="link in getGroup('ข้อมูลและการตั้งค่า')?.links"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </NuxtLink>

              <a
                v-else
                :href="link.to"
                target="_blank"
                rel="noopener"
                class="hover:text-primary transition"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Column 5 (เหมือนเดิมทุกตัวอักษร) -->
      <div class="space-y-3">
        <div class="flex flex-col space-y-3 xl:pl-10">
          <h3 class="font-semibold text-gray-900">
            สอบถามข้อมูลเพิ่มเติม
          </h3>

          <p
            class="font-bold text-[#0D95DA] text-lg tracking-wide md:whitespace-nowrap"
          >
            โทร. 1491 หรือ 02-908-8888
          </p>

          <h3 class="font-semibold text-gray-900">ติดต่อเรา</h3>

          <p class="text-xs leading-relaxed text-gray-600">
            บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)(สำนักงานใหญ่)
            74/1 หมู่ 1 ต.ท่าอิฐ อ.ปากเกร็ด จ.นนทบุรี 11120
          </p>

          <div class="mt-6 max-w-65">
            <h3 class="font-semibold mb-3 text-gray-900">
              ติดตามเราได้ทุกช่องทาง
            </h3>

            <div class="flex items-center gap-3 flex-wrap">
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:facebook" class="w-8 h-8 text-[#1877F2]" />
              </a>

              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:x" class="w-6 h-6 text-black" />
              </a>

              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:youtube" class="w-8 h-8 text-[#FF0000]" />
              </a>

              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:instagram" class="w-8 h-8 text-[#E4405F]" />
              </a>

              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:tiktok" class="w-6 h-6 text-black" />
              </a>

              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:line" class="w-6 h-6 text-[#06C755]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar (เหมือนเดิมทุกตัวอักษร) -->
    <div class="bg-primary text-white text-sm">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-center">
        <div
          class="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center"
        >
          <span>Copyright © 2026 Advice All rights reserved.</span>
          <span class="text-xs opacity-90">
            นโยบายความเป็นส่วนตัว | ตั้งค่าการใช้งานคุกกี้
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
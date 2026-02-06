<script setup>
import { Icon } from '@iconify/vue';
</script>
<template>
  <footer class="bg-white">
    <!-- Top section -->
    <div class="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-4">
      <!-- Column 1 -->
      <div class="space-y-4">
        <div class="text-3xl font-bold text-[#0D95DA]">
          Advice <br>
          <span class="text-green-500">Dealers</span>
        </div>
        <div class="mt-2 h-0.5 w-85 bg-gray-200"/>
        <p class="font-bold text-[#0D95DA] text-xl leading-8 tracking-wide">
          “แอดไวซ์ ศูนย์รวมเทคโนโลยี <br> ไลฟ์สไตล์ ไอที สมาร์ทโฟน”
        </p>

        <p class="text-gray-500 text-xs leading-relaxed">
          จำหน่ายและซ่อม ครบ จบ ในที่เดียว “มากกว่าร้านขายคอม” <br> เพราะเราคือ
          “Lifestyle IT Community” <br> มีสาขาครอบคลุมทั่วไทย, สปป.ลาว และ Online
          จะซื้อ จะซ่อม จะขาย <br> พูดคุยทุกเรื่องราวไอที ครบ จบ ในที่เดียว
        </p>
      </div>

      <!-- Column 2 -->
      <div class="space-y-8">
        <div>
          <h3 class="font-semibold mb-2 text-gray-900">ระบบการสั่งซื้อ</h3>
          <div class="h-0.5 w-full bg-gray-200"/>

          <ul class="mt-3 space-y-2">
            <li>สั่งซื้อสินค้า</li>
            <li>รายการสินค้าค้างส่ง</li>
            <li>ใบสั่งซื้อย้อนหลัง</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-2 text-gray-900">รายงาน</h4>
          <div class="h-0.5 w-full bg-gray-200"/>

          <ul class="mt-3 space-y-2">
            <li>รายงานยอดขาย</li>
            <li>รายงานการสั่งซื้อ</li>
          </ul>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="space-y-8 ">
        <div>
          <h3 class="font-semibold mb-2 text-gray-900">การเงินและชำระเงิน</h3>
          <div class="mt-1 h-0.5 w-full bg-gray-200"/>

          <ul class="space-y-2 mt-4">
            <li>ชำระ / อัปโหลดหลักฐานโอน</li>
            <li>ชำระหนี้ Advice สนญ.</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-2 text-gray-900">
            สื่อการขายและโปรโมชั่น
          </h4>
          <div class="mt-1 h-0.5 w-full bg-gray-200"/>

          <ul class="space-y-2 mt-4">
            <li>โปรโมชั่น Dealers</li>
            <li>พิมพ์ป้ายราคา (Standard)</li>
            <li>พิมพ์ป้ายราคา (Gaming)</li>
          </ul>
        </div>
      </div>

      <!-- Column 4 -->
      <div class="space-y-8 ">
        <div>
          <h3 class="font-semibold mb-2 text-gray-900">ติดตามสถานะและเคลม</h3>
          <div class="mt-1 h-0.5 w-full bg-gray-200"/>

          <ul class="space-y-2 mt-4">
            <li>ตรวจสอบสถานะการเคลม</li>
            <li>สินค้าคืนรอตัดสินใจ</li>
            <li>รายงานการจัดส่ง</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-2 text-gray-900">เงื่อนไข</h4>
          <div class="mt-1 h-0.5 w-full bg-gray-200"/>

          <ul class="space-y-2 mt-4">
            <li>เงื่อนไขการจัดส่ง</li>
          </ul>
        </div>
      </div>

      <!-- Column 5 -->
      <div class="space-y-3">
        <div class="flex flex-col space-y-3 lg:pl-10">
          <h3 class="font-semibold text-gray-900">สอบถามข้อมูลเพิ่มเติม</h3>

          <p
            class="font-bold text-[#0D95DA] text-lg tracking-wide md:whitespace-nowrap"
          >
            โทร. 1491 หรือ 02-908-8888
          </p>

          <h3 class="font-semibold text-gray-900">ติดต่อเรา</h3>

          <p class="text-xs leading-relaxed text-gray-600">
            บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)(สำนักงานใหญ่) 74/1 หมู่ 1
            ต.ท่าอิฐ อ.ปากเกร็ด จ.นนทบุรี 11120
          </p>
          <!-- Social -->
          <div class="mt-6 max-w-65">
            <h3 class="font-semibold mb-3 text-gray-900">
              ติดตามเราได้ทุกช่องทาง
            </h3>

            <div class="flex items-center gap-3 flex-wrap">
              <!-- Facebook -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:facebook" class="w-8 h-8 text-[#1877F2]" />
              </a>

              <!-- X -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:x" class="w-6 h-6 text-black" />
              </a>

              <!-- YouTube -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:youtube" class="w-8 h-8 text-[#FF0000]" />
              </a>

              <!-- Instagram -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="mdi:instagram" class="w-8 h-8 text-[#E4405F]" />
              </a>

              <!-- TikTok -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:tiktok" class="w-6 h-6 text-black" />
              </a>

              <!-- LINE -->
              <a href="#" class="hover:scale-110 transition">
                <Icon icon="simple-icons:line" class="w-6 h-6 text-[#06C755]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="bg-[#00569C] text-white text-sm">
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

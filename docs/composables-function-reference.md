# Composables Function Reference

เอกสารนี้สรุปหน้าที่ของแต่ละไฟล์และแต่ละฟังก์ชันใน `dealer-web/composables`

## auth/useUser.ts
- `useUser()`
  - สร้าง global state `users` (mock users + mock addresses)
  - สร้าง `currentUser` แบบ computed (user id `202`)
  - คืน helper `getFullAddress(addr)` สำหรับแปลงที่อยู่เป็นข้อความเดียว
- `getFullAddress(addr)`
  - คืนข้อความที่อยู่รูปแบบไทย (`addressDetail + ต. + อ. + จ. + postalCode`)

## auth/useRolePricing.ts
- `useRolePricing()`
  - คืนเครื่องมือคำนวณราคาตาม role
- `getRoleMultiplier(role)`
  - คืนตัวคูณราคาตาม role (`Technician/Dealer/Franchise`)
  - ถ้าไม่เจอ role คืน `1`
- `getRolePrice(basePrice, role)`
  - คำนวณราคาสุทธิจาก `basePrice * roleMultiplier`

## auth/useAuth.ts
- `useAuth()`
  - จัดการ identity ผู้ใช้งานปัจจุบัน (`currentUserId`, `currentUser`)
  - ผูก role pricing ผ่าน `useRolePricing`
  - จัดการ cart ของ user ปัจจุบัน (`activeCart`)
  - คืน action หลัก: `login/logout/addToCart/createNewCart/setDefaultCart/getRolePrice`
- `createDefaultCart(userId)`
  - สร้าง cart เริ่มต้นของ user
- `ensureUserDefaultCart(user)`
  - ถ้า user ไม่มี carts จะสร้าง default cart ให้อัตโนมัติ
- `getRolePrice(basePrice)`
  - คำนวณราคาโดยใช้ role ของ `currentUser`
- `addToCart(product, quantity)`
  - เพิ่มสินค้าลง cart ที่ active
  - ถ้ามีสินค้านั้นอยู่แล้วจะเพิ่มจำนวน
  - บันทึก `priceAtAdded` ตอนเพิ่มสินค้า
- `createNewCart(name)`
  - สร้าง cart ใหม่ของ user ปัจจุบัน
- `setDefaultCart(cartId)`
  - ตั้ง cart เป้าหมายให้เป็น default
- `login(role)`
  - เลือก user แรกที่ role ตรงกัน แล้ว set เป็น active
- `logout()`
  - ล้าง active user (`null`)

## auth/useCart.ts
- `useCart()`
  - เป็น wrapper ของ `useAuth()` เพื่อ expose เฉพาะ cart API
  - คืน `activeCart/addToCart/createNewCart/setDefaultCart/getRolePrice`

## po/usePOPricing.ts
- `usePOPricing()`
  - รวม utility คำนวณยอด PO
- `getEffectiveQuantity(item)`
  - คืนจำนวนที่คิดเงินจริง โดย clamp ตาม stock (`min(orderQty, stock)`)
- `getSubtotalFromItems(items)`
  - รวมราคาย่อยจากทุกบรรทัด (`priceAtPurchase * effectiveQty`)
- `getVat(subtotal, rate)`
  - คำนวณ VAT (default `7%`)
- `getGrandTotal(subtotal, rate)`
  - ยอดรวมสุทธิ (`subtotal + vat`)
- `getOrderSubtotal(po)`
  - คืน subtotal ของ PO (ถ้าไม่มี PO คืน `0`)

## po/useMockPO.ts
- `useMockPO()`
  - จัดการ mock purchase orders และ filter ตามผู้ใช้ที่ล็อกอิน
- `userOrders`
  - computed รายการ PO ของ `currentUser`
- `getPOById(id)`
  - หา PO ตาม id เฉพาะที่เป็นของผู้ใช้ปัจจุบัน
- `getAllPO()`
  - คืน mock POs ทั้งหมด
- `getLatestPO()`
  - คืน PO ล่าสุดของทั้งระบบ (เรียงตาม `createdAt`)
- `getLatestUserPO`
  - computed PO ล่าสุดของผู้ใช้ปัจจุบัน
- `updatePOItemQuantity(poId, productId, newQty)`
  - แก้จำนวนสินค้าใน PO
  - คำนวณ `totalAmount` ใหม่ด้วย `getSubtotalFromItems`

## po/usePOCheckoutState.ts
- `usePOCheckoutState()`
  - ถือ global state ของสถานะ checkout แยกตาม `poId`
  - ใช้ route param เพื่อเลือก state ของ PO ปัจจุบัน
- `createDefaultState()`
  - คืน state เริ่มต้นของ flow checkout
- `ensurePOState(id)`
  - สร้าง state ให้ PO นั้นถ้ายังไม่มี
- `state`
  - computed state ของ PO ปัจจุบัน
- `isAddressReady`
  - true เมื่อกรอกครบ: shipping/tax/delivery/payment
- `setStockChecked(value)`
  - set flag ว่าตรวจสต็อกแล้วหรือยัง
- `setAddressValidationAttempted(value)`
  - set flag ว่าผู้ใช้กดยืนยัน validation แล้วหรือยัง
- `setAddressSelections(payload)`
  - set สถานะครบถ้วนของการเลือกที่อยู่/จัดส่ง/ชำระเงิน

## po/usePOFlow.ts
- `usePOFlow()`
  - กำหนด step metadata ของหน้าสั่งซื้อ 3 ขั้นตอน
- `steps`
  - รายการขั้นตอนและไอคอน
- `currentStep`
  - คำนวณ step ปัจจุบันจาก route path (`/address`, `/payment`, default)

## po/useDeliveryMethods.ts
- `useDeliveryMethods()`
  - คืนรายการวิธีจัดส่งคงที่ (`deliveryMethods`)

## po/usePOFooterHelpers.ts
- `usePOFooterHelpers()`
  - รวม formatter ไทยจาก `useThaiFormatters`
  - คืน helper ทำ async task พร้อม loading
- `runWithLoading(loading, task)`
  - เปิด loading -> รัน task -> ปิด loading เสมอ (ผ่าน `finally`)

## po/useAddressSelectionModal.ts
- `useAddressSelectionModal(props, emit)`
  - state + logic ของ modal เลือก/เพิ่ม/แก้ไข/ลบที่อยู่
- `isAddressDefaultByMode(address)`
  - ตรวจว่าเป็น default ตามโหมด (`shipping` หรือ `tax`)
- `resetNewAddress()`
  - reset ฟอร์มเพิ่มที่อยู่
- `toggleMenu(id)`
  - เปิด/ปิด action menu ของรายการที่อยู่
- `handleSelect(id)`
  - เลือก address id ใน modal
- `handleNext()`
  - ไปขั้นถัดไป: shipping อาจบังคับเลือก delivery ก่อน
- `handleDeliveryConfirm(method)`
  - ยืนยันวิธีส่งและ emit ผลการเลือกที่อยู่
- `handleDeliveryBackOrClose()`
  - ปิด modal วิธีส่ง และปิด modal หลักในกรณี startWithDelivery
- `handleAdd()`
  - validate ขั้นต้น แล้ว emit `add` หรือ `update`
- `makeDefault(id)`
  - emit การตั้ง default
- `openEditModal(id)`
  - โหลดข้อมูลที่อยู่เดิมเข้า form เพื่อแก้ไข
- `deleteAddress(id)`
  - emit ลบที่อยู่ และล้าง selected ถ้าลบรายการที่เลือกอยู่
- `onPhoneInput()`
  - จำกัด input โทรศัพท์ให้เหลือเลข 10 หลัก
- `onPostalCodeInput()`
  - จำกัด input รหัสไปรษณีย์ให้เหลือเลข 5 หลัก
- `handleWindowClick()`
  - คลิกนอกเมนูแล้วปิด action menu
- `close()`
  - reset state ชั่วคราวแล้ว emit ปิด modal
- watchers/lifecycle
  - sync `localSelectedId` กับ prop
  - เปิด delivery modal อัตโนมัติเมื่อ `startWithDelivery`
  - เพิ่ม/ลบ window click listener ตอน mount/unmount

## po/useTaxAddressModal.ts
- `useTaxAddressModal(props, emit)`
  - state + validation ของ modal ที่อยู่ออกใบกำกับภาษี
- `blankForm()`
  - คืนค่าฟอร์มเริ่มต้น
- watch `props.isOpen`
  - เมื่อเปิด modal: merge `initialData` ลงฟอร์ม
- `onTaxIdInput()`
  - จำกัด tax ID เป็นตัวเลขไม่เกิน 13 หลัก
- `onPostalCodeInput()`
  - จำกัดรหัสไปรษณีย์เป็นตัวเลข 5 หลัก
- `isFormValid`
  - ตรวจความครบถ้วนขั้นต่ำก่อน submit
- `close()`
  - emit ปิด modal
- `submit()`
  - ถ้าฟอร์ม valid จะ emit ข้อมูลภาษี

## po/usePOAddressStep.ts
- `usePOAddressStep(args)`
  - logic ทั้งหน้าขั้นตอน Address + Delivery + Payment ของ PO checkout
  - ถือ state modal, ที่อยู่ที่เลือก, payment/delivery, validation flags
- computed หลัก
  - `savedAddresses` รายการที่อยู่ของผู้ใช้
  - `currentAddress/currentTaxAddress` ที่อยู่ที่เลือก
  - `showSelectionErrors`/`isShippingMissing`/`isTaxMissing`/`isDeliveryMissing`/`isPaymentMissing`
  - `selectedDeliveryData` รายละเอียดวิธีส่งที่ถูกเลือก
  - `currentTaxId` เลขภาษีจาก tax address
  - `currentShippingIsDefault/currentTaxIsDefault` สถานะ default
  - `modalAddresses` ที่อยู่สำหรับแสดงใน modal
  - `taxModalInitialData` ข้อมูลตั้งต้นของ tax modal
- helper หลัก
  - `isShippingDefaultAddress()/isTaxDefaultAddress()` ตรวจ default address
  - `joinAddressParts(...parts)` รวมข้อความที่อยู่จากหลายช่อง
- event handlers
  - `openModal(mode, startWithDelivery)` เปิด modal เลือกที่อยู่
  - `handleDeliveryConfirm(method)` ยืนยันวิธีจัดส่ง
  - `handleAddressSelect(id)` เลือก shipping/tax address
  - `handleAddressAdd(newAddr)` เพิ่มที่อยู่ใหม่และรองรับตั้ง default
  - `handleAddressUpdate(payload)` แก้ไขที่อยู่เดิมและจัดการ default
  - `handleAddressDelete(id)` ลบที่อยู่ และ clear selected ที่เกี่ยวข้อง
  - `handleSetDefaultAddress(id)` ตั้ง default ตาม modal mode
  - `handleTaxAddressSubmit(taxForm)` สร้าง/แก้ที่อยู่ออกใบกำกับภาษี
  - `handleTaxAddressAddRequest()` ปิด modal ที่อยู่หลักและเปิด tax modal
  - `goBack()` กลับหน้า PO หลัก
- pricing/stock display
  - `getStockStatus(item)` คืนข้อความสถานะสต็อก + class สี
  - `getLineTotal(item)` คำนวณยอดบรรทัดโดยอิง effective quantity
- watchers/lifecycle
  - watch `savedAddresses` เพื่อ auto-select default shipping/tax
  - watch selections ทั้งหมดแล้วอัปเดต `setAddressSelections`
  - `onMounted` reset สถานะ `addressValidationAttempted`

## shared/useLoading.ts
- `useLoading()`
  - global state loading กลาง (`global-loading`)
- `startLoading()`
  - ตั้ง loading = true
- `stopLoading()`
  - ตั้ง loading = false

## shared/useScrollLock.ts
- `useScrollLock(isLocked)`
  - watch ค่า lock เพื่อเปิด/ปิด body scroll
  - ตอน lock: ชดเชย scrollbar ด้วย `paddingRight` + ใส่ class `overflow-hidden-modal`
  - ตอน unlock/unmount: คืนค่า body styles กลับสภาพเดิม

## shared/useNotifyLogic.ts
- `useNotifyLogic()`
  - state + validation ของ modal แจ้งเตือนสินค้า
- refs/state
  - `showNotifyModal`, `isSuccess`, `targetProduct`, `isSubmitted`, `notifyForm`
- computed
  - `isEmailValid` ตรวจรูปแบบอีเมล
  - `isTelValid` ตรวจเบอร์โทร (ไม่กรอกได้ หรือกรอกต้อง 10 หลักขึ้นต้น 0)
- `resetNotifyState()`
  - reset success/submitted/form
- `openNotifyModal(product)`
  - เปิด modal พร้อมระบุ product เป้าหมาย
- `onlyNumeric(event)`
  - กันการพิมพ์ non-digit ใน field เบอร์โทร

## shared/useThaiFormatters.ts
- `useThaiFormatters()`
  - รวม formatter พื้นฐาน locale ไทย
- `formatNumber(value, maxFractionDigits)`
  - ฟอร์แมตตัวเลข
- `formatCurrency(value, maxFractionDigits)`
  - ฟอร์แมตสกุลเงิน THB
- `formatThaiDate(value, withTime)`
  - ฟอร์แมตวันที่ไทย (`Asia/Bangkok`) และเพิ่มเวลาได้
- `formatThaiDateTime(value)`
  - shorthand ของ `formatThaiDate(value, true)`

## shared/useProductUrl.ts
- `useProductUrl()`
  - สร้าง URL สินค้าแบบ SEO
- `getProductUrl(product)`
  - แปลงชื่อสินค้าเป็น slug แล้วต่อท้าย `-id`
  - คืน `#` ถ้าข้อมูลไม่ครบ

## dashboard/useNavigation.ts
- `useNavigation()`
  - คืน `menuGroups` สำหรับหน้า navigation หลักของ dealer

## dashboard/useNavigation_Profile.ts
- `useNavigationProfile()`
  - คืน `menuGroupsProfile` สำหรับหน้า profile dealer
  - มี action พิเศษ `latestPO` ในบางเมนู

## dashboard/useDashboard.ts
- `useDashboard()`
  - รวม mock data และ computed สำหรับ dashboard
- state/data หลัก
  - `startDate/endDate` ตัวกรองช่วงวันที่กราฟ
  - `banner1/banner2` banner
  - `products` สินค้า mock
  - `newList` ข่าว
  - `stats`, `quickAccessItems`, `topSales`, `bottomSales`
- computed
  - `categoryTitle` ดึงหมวดจากสินค้าตัวแรก
  - `chartData` กรองข้อมูลรายเดือนตามวันที่เริ่ม/สิ้นสุดแล้วแปลงเป็น dataset
  - `productDistribution` สรุปจำนวนสินค้าต่อแบรนด์เพื่อใช้ทำ chart
  - `trendingProducts` ดึงสินค้ายอดนิยมและจำลองราคาเก่า/ส่วนลด

## category/useCategoryFilters.ts
- `useCategoryFilters(params)`
  - utility filter/sort/group สินค้าหน้าหมวดหมู่
- `filteredProducts`
  - กรองตาม subCategory, subTag, searchQuery, stockStatus
- `productsBySubTag`
  - จัดกลุ่ม `filteredProducts` ตาม `tag` และ sort key
- `currentSubCatTags`
  - ดึง tag ทั้งหมดของหมวดที่เลือกสำหรับทำตัวเลือก filter

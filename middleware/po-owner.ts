import { useAuth } from '~/composables/auth/useAuth';
import { useMockPO } from '~/composables/po/useMockPO';


export default defineNuxtRouteMiddleware((to) => {
  const poId = String(to.params.id ?? '');
  const { currentUser } = useAuth();
  const { userOrders } = useMockPO();

  if (!currentUser.value) {
    throw createError({
      statusCode: 401,
      statusMessage: 'กรุณาเข้าสู่ระบบก่อนเข้าถึงใบสั่งซื้อ',
    });
  }

  const isOwner = userOrders.value.some((order) => order.id === poId);
  if (!isOwner) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ไม่พบรายการใบสั่งซื้อที่คุณต้องการ',
    });
  }
});

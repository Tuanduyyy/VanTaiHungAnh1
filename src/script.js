/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vận Tải Hùng Anh - Logistics Script
 */

// Hàm tính toán giá vận chuyển đơn giản
function initCalculator() {
  const distanceInput = document.getElementById('distance-input');
  const weightInput = document.getElementById('weight-input');
  const resultContainer = document.getElementById('result-container');
  const priceValue = document.getElementById('price-value');

  if (!distanceInput || !weightInput || !resultContainer || !priceValue) return;

  function calculateShipping() {
    let distance = parseFloat(distanceInput.value) || 0;
    let weight = parseFloat(weightInput.value) || 0;

    // Chặn giới hạn trong code JS
    if (distance > 5000) distance = 5000;
    if (weight > 21000) weight = 21000;

    if (distance <= 0) {
      resultContainer.classList.add('hidden');
      return;
    }

    // Logic tính giá: 
    // Giá = (khoảng cách (km) × 10.000đ) + (cân nặng (kg) × 5.000đ) + phí cố định: 50.000đ
    const baseFee = 50000;
    const pricePerKm = 10000;
    const pricePerKg = 5000;
    const totalPrice = Math.round((distance * pricePerKm) + (weight * pricePerKg) + baseFee);

    // Hiển thị kết quả
    priceValue.innerText = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    
    resultContainer.classList.remove('hidden');
  }

  distanceInput.addEventListener('input', calculateShipping);
  weightInput.addEventListener('input', calculateShipping);
}

// Hero Slider Logic
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  let currentSlide = 0;
  let slideInterval;
  // --- Biến lưu trạng thái ---
let startX = 0;
let isDragging = false;
const sliderContainer = slides[0].parentElement;

// --- Hàm xử lý khi bắt đầu chạm/click ---
const dragStart = (e) => {
    isDragging = true;
    // Lấy vị trí X bất kể là chuột hay cảm ứng
    startX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
};

// --- Hàm xử lý khi kết thúc chạm/click ---
const dragEnd = (e) => {
    if (!isDragging) return;
    
    const endX = e.type.includes('touch') ? e.changedTouches[0].pageX : e.pageX;
    const distance = endX - startX;
    const threshold = 50; // Khoảng cách kéo tối thiểu (pixel)

    if (Math.abs(distance) > threshold) {
        if (distance > 0) {
            // Kéo từ trái sang phải -> Quay lại slide trước
            showSlide(currentSlide - 1);
        } else {
            // Kéo từ phải sang trái -> Xem slide tiếp theo
            showSlide(currentSlide + 1);
        }
        resetAutoSlide();
    }

    isDragging = false;
};

// --- Đăng ký sự kiện cho Mobile (Touch) ---
sliderContainer.addEventListener('touchstart', dragStart, { passive: true });
sliderContainer.addEventListener('touchend', dragEnd, { passive: true });

// --- Đăng ký sự kiện cho Máy tính (Mouse) ---
sliderContainer.addEventListener('mousedown', dragStart);
sliderContainer.addEventListener('mouseup', dragEnd);
// Ngăn việc bôi đen chữ hoặc kéo nhầm ảnh khi đang drag chuột
sliderContainer.addEventListener('mouseleave', () => isDragging = false); 
sliderContainer.addEventListener('dragstart', (e) => e.preventDefault());
  
  if (slides.length === 0) return;

  function showSlide(index) {
    slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      resetAutoSlide();
    });
  }

  startAutoSlide();
}

// Mobile Menu Logic
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuButton || !mobileMenu) return;

  function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi mở menu
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  menuButton.addEventListener('click', toggleMenu);

  // Đóng menu khi click vào link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Đóng menu khi resize lên màn hình lớn
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

// Đảm bảo script chạy sau khi DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Vận Tải Hùng Anh Website Loaded');
  
  initCalculator();
  initHeroSlider();
  initMobileMenu();
  
  // Xử lý form liên hệ
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Lấy dữ liệu từ form
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const service = document.getElementById('contact-service').value;
      const message = document.getElementById('contact-message').value;
      
      // Tạo nội dung tin nhắn
      const fullMessage = `Chào Vận Tải Hùng Anh, tôi cần tư vấn:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Dịch vụ: ${service}\n- Lời nhắn: ${message}`;
      
      // Sao chép tin nhắn vào bộ nhớ tạm
      navigator.clipboard.writeText(fullMessage).then(() => {
        alert('Thông tin của bạn đã được tự động sao chép. Hệ thống sẽ chuyển bạn đến Zalo, bạn chỉ cần "Dán" (Paste) vào ô chat và gửi đi nhé!');
        
        // Mở Zalo
        const zaloUrl = `https://zalo.me/0388572672`;
        window.open(zaloUrl, '_blank');
      }).catch(err => {
        console.error('Lỗi sao chép: ', err);
        window.open(`https://zalo.me/0388572672`, '_blank');
      });
      
      contactForm.reset();
    });
  }
});

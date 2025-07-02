import React from "react";
// 1. Import các icon cần thiết từ react-icons
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Tăng padding tổng thể, đặc biệt là theo chiều dọc */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* 
          Sử dụng Grid Layout cho phần trên của footer
          - Mobile: 1 cột
          - Desktop (lg): 3 cột, logo chiếm 1, các link chiếm 2
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Cột 1: Logo và Mô tả */}
          <div className="lg:col-span-1">
            <img src="/Logo.png" alt="Logo" className="h-12 mb-4" />
            <p className="text-gray-400 text-sm max-w-xs">
              Nền tảng hàng đầu để mua và bán vé sự kiện, dễ dàng và đáng tin
              cậy.
            </p>
          </div>

          {/* 
            Cột 2 & 3: Các cột link
            - Container này chiếm 2 cột trên desktop
            - Bên trong nó là một grid lồng nhau
              - Mobile: 2 cột link
              - Tablet trở lên: 3 cột link
          */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Khám phá</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sự kiện
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Giá vé
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Về chúng tôi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Chính sách
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>Email: support@ticketplatform.com</li>
                <li>Điện thoại: +84 123 456 789</li>
                <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phần dưới của Footer: Copyright và Mạng xã hội */}
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TicketPlatform. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* 2. Sử dụng component SVG Icon */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

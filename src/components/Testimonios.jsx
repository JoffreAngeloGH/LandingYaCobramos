"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "Lo que antes me tomaba horas al día, ahora sucede solo. Con respuestas automáticas, ventas inteligentes y facturación automática, mi negocio funciona las 24 horas sin que yo tenga que estar siempre conectado.",
    author: "Bryan Villafuerte",
    role: "Green Cycle",
    avatar: "/images/logos/LogoTestimonioB.svg",
  },
];

export default function Testimonios() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const timeoutRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Manejar inicio del toque
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Manejar movimiento del toque (opcional, por si quieres feedback en tiempo real)
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Manejar fin del toque
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        // Swipe izquierda (siguiente)
        next();
        setAutoplay(false);
      } else if (distance < -50) {
        // Swipe derecha (anterior)
        prev();
        setAutoplay(false);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const next = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;

    timeoutRef.current = setTimeout(next, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, autoplay]);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <section id="testimonios" className="py-24 px-4 bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#3B4E73] ">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600  text-lg max-w-3xl mx-auto">
            Descubre cómo VendePe ha transformado los negocios de nuestros
            clientes
          </p>
        </div>

        <div className="relative">
          {/* 
          // Botón Prev - SOLO visible en md+
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <button
              className="rounded-full bg-white  shadow-md hover:shadow-lg border border-gray-200  p-2"
              onClick={() => {
                prev();
                setAutoplay(false);
              }}
              aria-label="Testimonio anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </div>
          */}

          <div
            className="overflow-hidden px-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center">
              <div
                className={`bg-white  rounded-2xl shadow-xl p-8 max-w-3xl ${
                  isAnimating
                    ? direction > 0
                      ? "slide-left"
                      : "slide-right"
                    : ""
                }`}
                onAnimationEnd={handleAnimationEnd}
                onMouseEnter={() => setAutoplay(false)}
              >
                {/* ...contenido del card... */}
                <div className="flex mb-6">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-blue-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-8  leading-relaxed">
                  "{testimonials[current].quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gray-200  rounded-full mr-4 overflow-hidden">
                    <img
                      src={testimonials[current].avatar || "/placeholder.svg"}
                      alt={testimonials[current].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg ">
                      {testimonials[current].author}
                    </div>
                    <div className="text-gray-500 ">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*
          // Botón Next - SOLO visible en md+
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              className="rounded-full bg-white  shadow-md hover:shadow-lg border border-gray-200  p-2"
              onClick={() => {
                next();
                setAutoplay(false);
              }}
              aria-label="Siguiente testimonio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          */}

          {/*
          // Botones debajo del card SOLO en móviles
          <div className="flex md:hidden justify-center gap-6 mt-6">
            <button
              className="rounded-full bg-white  shadow-md hover:shadow-lg border border-gray-200  p-2"
              onClick={() => {
                prev();
                setAutoplay(false);
              }}
              aria-label="Testimonio anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="rounded-full bg-white  shadow-md hover:shadow-lg border border-gray-200 d p-2"
              onClick={() => {
                next();
                setAutoplay(false);
              }}
              aria-label="Siguiente testimonio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          */}
        </div>

        {
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300  hover:bg-gray-400 "
                }`}
                onClick={() => {
                  setCurrent(index);
                  setAutoplay(false);
                }}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        }
      </div>

      {/* ...styles... */}
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-left {
          animation: slideLeft 0.5s ease-out forwards;
        }

        .slide-right {
          animation: slideRight 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

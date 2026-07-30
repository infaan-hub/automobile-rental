import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "James Mitchell",
    role: "CEO, Mitchell Corp",
    quote: "Exceptional service from start to finish. The vehicle was immaculate and the booking process was seamless. This is how premium rental should feel.",
    rating: 5,
    initials: "JM",
  },
  {
    name: "Sarah Chen",
    role: "Travel Blogger",
    quote: "I've rented luxury cars all over the world, and this experience was truly top-tier. The Porsche 911 made my road trip unforgettable.",
    rating: 5,
    initials: "SC",
  },
  {
    name: "Alexander Roth",
    role: "Entrepreneur",
    quote: "The convenience and professionalism are unmatched. Having a premium vehicle ready at my destination saved me so much time and hassle.",
    rating: 5,
    initials: "AR",
  },
  {
    name: "Emily Watson",
    role: "Creative Director",
    quote: "Absolutely love the curated selection of vehicles. The S-Class was perfect for our business trip — elegance meets comfort.",
    rating: 5,
    initials: "EW",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
        </motion.div>
      </div>
      <div className="mx-auto max-w-5xl px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".testimonials-pagination" }}
          loop
          className="pb-14"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card relative flex h-full flex-col p-6"
              >
                <Quote className="absolute right-5 top-5 size-8 text-amber-500/20" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 text-sm font-bold text-amber-500">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="size-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonials-pagination flex justify-center gap-2 [&>.swiper-pagination-bullet]:!size-2 [&>.swiper-pagination-bullet]:!rounded-full [&>.swiper-pagination-bullet]:!bg-border [&>.swiper-pagination-bullet-active]:!w-6 [&>.swiper-pagination-bullet-active]:!rounded-full [&>.swiper-pagination-bullet-active]:!bg-amber-500" />
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type WeddingInvitationData = {
  // Card Configuration
  cardLanguage: "ms" | "en";
  cardDesign?: string;

  // Couple Information
  groomFullName: string;
  brideFullName: string;
  groomNickname: string;
  brideNickname: string;
  nameOrder: "male-female" | "female-male";
  fatherName?: string;
  motherName?: string;

  // Event Information
  eventType: string;
  eventDate: string;
  hijriDate?: string;
  startTime: string;
  endTime: string;

  // Location
  addressLine1: string;
  addressLine2?: string;
  googleMapsLink?: string;
  wazeLink?: string;

  // Contacts
  contacts?: Array<{
    name: string;
    phone: string;
  }>;
};

interface WeddingInvitationProps {
  data: WeddingInvitationData;
}

export function WeddingInvitation({ data }: WeddingInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const openCurtain = () => {
    setIsOpen(true);
  };

  // Countdown Timer Effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(data.eventDate);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial value asynchronously
    const initialTimeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(timer);
    };
  }, [data.eventDate]);

  const firstPerson =
    data.nameOrder === "male-female"
      ? {
          fullName: data.groomFullName,
          nickname: data.groomNickname,
        }
      : {
          fullName: data.brideFullName,
          nickname: data.brideNickname,
        };

  const secondPerson =
    data.nameOrder === "male-female"
      ? {
          fullName: data.brideFullName,
          nickname: data.brideNickname,
        }
      : {
          fullName: data.groomFullName,
          nickname: data.groomNickname,
        };

  const locale = data.cardLanguage;

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = new Intl.DateTimeFormat(
      locale === "ms" ? "ms-MY" : "en-US",
      {
        weekday: "long",
      },
    ).format(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return { weekday, formatted: `${day}.${month}.${year}` };
  };

  const formatDateLong = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === "ms" ? "ms-MY" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const dateShort = formatDateShort(data.eventDate);
  const dateLong = formatDateLong(data.eventDate);

  // Curtain animation variants
  const curtainVariants = {
    closed: { x: 0, opacity: 1 },
    open: { x: "-100%", opacity: 0 },
  };

  const rightCurtainVariants = {
    closed: { x: 0, opacity: 1 },
    open: { x: "100%", opacity: 0 },
  };

  const badgeVariants = {
    initial: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  // Scroll animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Countdown animation variants
  const countdownItemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background (content behind curtains) */}
      <div className="flex items-center justify-center w-full">
        <div className="h-full z-10 w-xl max-w-2xl shadow-lg shadow-gray-200 pb-14">
          {/* Hero Section - Cover Page */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image */}
            {data.cardDesign && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={`/card-design/${data.cardDesign}.png`}
                  alt="Wedding background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-white/10" />
              </div>
            )}

            <motion.div
              className="mx-10 text-center space-y-12 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeInUpVariants}
            >
              {/* Event Type Header */}
              <div className="space-y-4">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-light">
                  {locale === "ms" ? "Majlis Perkahwinan" : "The Wedding Of"}
                </p>

                {/* Couple Names - Hero Display */}
                <div className="space-y-3">
                  <h1
                    className={cn(
                      "text-6xl md:text-7xl lg:text-8xl font-display tracking-tight",
                    )}
                  >
                    {firstPerson.nickname.toUpperCase()}
                  </h1>
                  <p className="text-4xl md:text-5xl font-display font-light">
                    &
                  </p>
                  <h1
                    className={cn(
                      "text-6xl md:text-7xl lg:text-8xl font-display tracking-tight",
                    )}
                  >
                    {secondPerson.nickname.toUpperCase()}
                  </h1>
                </div>

                {/* Date Display */}
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground font-light pt-8">
                  {dateShort.weekday.toUpperCase()} • {dateShort.formatted}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Details Section */}
          <section className="min-h-screen flex items-center justify-center">
            <motion.div
              className="mx-20 text-center space-y-12 py-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeInUpVariants}
            >
              {/* Opening Text */}
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                variants={fadeInUpVariants}
              >
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {locale === "ms"
                    ? "Dengan penuh rasa syukur ke hadrat Allah S.W.T"
                    : "With Joy and Gratitude to Almighty God"}
                </p>

                {/* Parents Names */}
                {(data.fatherName || data.motherName) && (
                  <div className="space-y-3 py-6">
                    {data.fatherName && (
                      <p className="text-xl md:text-2xl text-muted-foreground font-elegant italic">
                        {data.fatherName}
                      </p>
                    )}
                    <p className="text-xl md:text-2xl text-muted-foreground font-display italic">
                      &
                    </p>
                    {data.motherName && (
                      <p className="text-xl md:text-2xl text-muted-foreground font-elegant italic">
                        {data.motherName}
                      </p>
                    )}
                  </div>
                )}

                {/* Invitation Text */}
                <p className="text-sm text-muted-foreground">
                  {locale === "ms"
                    ? "dengan hormatnya menjemput"
                    : "cordially invite"}
                </p>
                {locale === "ms" && (
                  <p className="text-sm text-muted-foreground">
                    Dato&apos;/Datin/Tuan/Puan/Encik/Cik
                  </p>
                )}
                {!locale ||
                  (locale === "en" && (
                    <p className="text-sm text-muted-foreground">
                      Mr. / Mrs. / Ms.
                    </p>
                  ))}
                <p className="text-sm text-muted-foreground">
                  {locale === "ms"
                    ? `ke majlis ${data.eventType.toLowerCase()} ${locale === "ms" ? "anak kami" : "of our son and daughter"}`
                    : `to the ${data.eventType.toLowerCase()} reception of our son and daughter`}
                </p>
              </motion.div>

              {/* Full Names */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variants={fadeInUpVariants}
              >
                <h2 className="text-3xl md:text-4xl text-muted-foreground font-elegant tracking-wide">
                  {firstPerson.fullName}
                </h2>
                <p className="text-3xl font-display font-light text-muted-foreground">
                  &
                </p>
                <h2 className="text-3xl md:text-4xl text-muted-foreground font-elegant tracking-wide">
                  {secondPerson.fullName}
                </h2>
              </motion.div>

              {/* VENUE Section */}
              <motion.div
                className="space-y-4 pt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "ms" ? "Lokasi" : "Venue"}
                </h3>
                <div className="space-y-2">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {data.addressLine1}
                    {data.addressLine2 && (
                      <>
                        ,<br />
                        {data.addressLine2}
                      </>
                    )}
                  </p>
                </div>
                {/* Navigation Buttons */}
                <div className="space-y-4">
                  {(data.googleMapsLink || data.wazeLink) && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {data.googleMapsLink && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="gap-2 min-w-50 text-muted-foreground"
                          asChild
                        >
                          <a
                            href={data.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="w-4 h-4" />
                            Google Maps
                          </a>
                        </Button>
                      )}
                      {data.wazeLink && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="gap-2 min-w-50 text-muted-foreground"
                          asChild
                        >
                          <a
                            href={data.wazeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="w-4 h-4" />
                            Waze
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* DATE Section */}
              <motion.div
                className="space-y-4 pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "ms" ? "Tarikh" : "Date"}
                </h3>
                <div className="space-y-1">
                  <p className="text-base text-muted-foreground">{dateLong}</p>
                  {data.hijriDate && (
                    <p className="text-sm text-muted-foreground italic">
                      {data.hijriDate}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* TIME Section */}
              <motion.div
                className="space-y-4 pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "ms" ? "Masa" : "Time"}
                </h3>
                <p className="text-base text-muted-foreground">
                  {data.startTime} - {data.endTime}
                </p>
              </motion.div>

              {/* CONTACT Section */}
              <motion.div
                className="space-y-2 pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "ms" ? "Hubungi" : "Contact"}
                </h3>
                <p className="text-base text-muted-foreground">
                  {locale === "ms"
                    ? "Untuk sebarang pertanyaan"
                    : "For any inquiries"}
                </p>
                {data.contacts && data.contacts.length > 0 && (
                  <div className="space-y-4 max-w-sm mx-auto pt-2">
                    {data.contacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white"
                      >
                        <span className="font-medium">{contact.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-muted-foreground"
                          asChild
                        >
                          <a
                            href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="space-y-6 pt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-lg uppercase text-muted-foreground">
                  #AHMADXNORA
                </h3>
              </motion.div>

              {/* COUNTDOWN Section */}
              <motion.div
                className="space-y-6 pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "ms" ? "Menghitung Hari" : "Counting Down"}
                </h3>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {/* Days */}
                  <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    variants={countdownItemVariants}
                  >
                    <motion.div
                      key={timeLeft.days}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl md:text-4xl font-display font-bold text-muted-foreground"
                    >
                      {timeLeft.days}
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "ms" ? "Hari" : "Days"}
                    </div>
                  </motion.div>

                  {/* Hours */}
                  <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.2,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    variants={countdownItemVariants}
                  >
                    <motion.div
                      key={timeLeft.hours}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl md:text-4xl font-display font-bold text-muted-foreground"
                    >
                      {timeLeft.hours}
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "ms" ? "Jam" : "Hours"}
                    </div>
                  </motion.div>

                  {/* Minutes */}
                  <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.3,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    variants={countdownItemVariants}
                  >
                    <motion.div
                      key={timeLeft.minutes}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl md:text-4xl font-display font-bold text-muted-foreground"
                    >
                      {timeLeft.minutes}
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "ms" ? "Minit" : "Minutes"}
                    </div>
                  </motion.div>

                  {/* Seconds */}
                  <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.4,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    variants={countdownItemVariants}
                  >
                    <motion.div
                      key={timeLeft.seconds}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl md:text-4xl font-display font-bold text-muted-foreground"
                    >
                      {timeLeft.seconds}
                    </motion.div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "ms" ? "Saat" : "Seconds"}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Watermark */}
              <motion.div
                className="pt-12 pb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={fadeInUpVariants}
              >
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground/50 font-light tracking-wide">
                    {locale === "ms" ? "Dicipta oleh" : "Created by"}
                  </p>
                  <p className="text-xl text-muted-foreground/60 font-serif tracking-wider">
                    ekad-semua
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Curtain Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {/* Left Curtain Panel */}
            <motion.div
              onClick={openCurtain}
              variants={curtainVariants}
              initial="closed"
              animate="closed"
              exit="open"
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={cn(
                "fixed top-0 left-0 w-1/2 h-screen z-50 cursor-pointer",
                "bg-linear-to-br from-gray-50 to-gray-100",
              )}
            />

            {/* Right Curtain Panel */}
            <motion.div
              onClick={openCurtain}
              variants={rightCurtainVariants}
              initial="closed"
              animate="closed"
              exit="open"
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={cn(
                "fixed top-0 right-0 w-1/2 h-screen z-50 cursor-pointer",
                "bg-white shadow-[inset_0px_0px_10px_rgba(0,0,0,0.5)]",
              )}
            />

            {/* Circular Badge with Initials - Centered between curtains */}
            <motion.div
              onClick={openCurtain}
              variants={badgeVariants}
              initial="initial"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 cursor-pointer"
            >
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-muted/30 border-2 border-muted-foreground/40 flex items-center justify-center shadow-lg backdrop-blur-sm flex-col space-y-4">
                <p className="text-2xl md:text-4xl font-display font-light text-muted-foreground tracking-wider">
                  {firstPerson.nickname.charAt(0).toUpperCase()}
                  <span className="font-serif italic mx-1">&</span>
                  {secondPerson.nickname.charAt(0).toUpperCase()}
                </p>
                <p className="text-lg md:text-xl text-center text-gray-600 font-light">
                  {locale === "ms" ? "Buka" : "Open"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

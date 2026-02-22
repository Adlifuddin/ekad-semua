"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type WeddingInvitationData = {
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
  locale?: string;
}

export function WeddingInvitation({
  data,
  locale = "en",
}: WeddingInvitationProps) {
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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = new Intl.DateTimeFormat(
      locale === "bahasa" ? "ms-MY" : "en-US",
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
    return new Intl.DateTimeFormat(locale === "bahasa" ? "ms-MY" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const dateShort = formatDateShort(data.eventDate);
  const dateLong = formatDateLong(data.eventDate);

  return (
    <div className="relative min-h-screen">
      {/* Left Curtain Panel */}
      <div
        onClick={openCurtain}
        className={cn(
          "fixed top-0 left-0 w-1/2 h-screen z-50 cursor-pointer",
          "bg-linear-to-br from-gray-50 to-gray-100",
          "transition-all duration-1000 ease-out",
          isOpen ? "-translate-x-full invisible" : "translate-x-0",
        )}
      ></div>

      {/* Background (content behind curtains) */}
      <div className="flex items-center justify-center w-full">
        <div className="h-full z-10 w-xl max-w-2xl shadow-lg shadow-gray-200 pb-20">
          {/* Hero Section - Cover Page */}
          <section className="min-h-screen flex items-center justify-center">
            <div className="mx-10 text-center space-y-12">
              {/* Event Type Header */}
              <div className="space-y-4">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-light">
                  {locale === "bahasa"
                    ? "Majlis Perkahwinan"
                    : "The Wedding Of"}
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
            </div>
          </section>

          {/* Details Section */}
          <section className="min-h-screen flex items-center justify-center">
            <div className="mx-10 text-center space-y-12 py-5">
              {/* Opening Text */}
              <div className="space-y-4">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {locale === "bahasa"
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
                  {locale === "bahasa"
                    ? "dengan hormatnya menjemput"
                    : "cordially invite"}
                </p>
                {locale === "bahasa" && (
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
                  {locale === "bahasa"
                    ? `ke majlis ${data.eventType.toLowerCase()} ${locale === "bahasa" ? "anak kami" : "of our son and daughter"}`
                    : `to the ${data.eventType.toLowerCase()} reception of our son and daughter`}
                </p>
              </div>

              {/* Full Names */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl text-muted-foreground font-elegant tracking-wide">
                  {firstPerson.fullName}
                </h2>
                <p className="text-3xl font-display font-light text-muted-foreground">
                  &
                </p>
                <h2 className="text-3xl md:text-4xl text-muted-foreground font-elegant tracking-wide">
                  {secondPerson.fullName}
                </h2>
              </div>

              {/* VENUE Section */}
              <div className="space-y-4 pt-12">
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "bahasa" ? "Lokasi" : "Venue"}
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
              </div>

              {/* DATE Section */}
              <div className="space-y-4 pt-8">
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "bahasa" ? "Tarikh" : "Date"}
                </h3>
                <div className="space-y-1">
                  <p className="text-base text-muted-foreground">{dateLong}</p>
                  {data.hijriDate && (
                    <p className="text-sm text-muted-foreground italic">
                      {data.hijriDate}
                    </p>
                  )}
                </div>
              </div>

              {/* TIME Section */}
              <div className="space-y-4 pt-8">
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "bahasa" ? "Masa" : "Time"}
                </h3>
                <p className="text-base text-muted-foreground">
                  {data.startTime} - {data.endTime}
                </p>
              </div>

              {/* CONTACT Section */}
              <div className="space-y-2 pt-8">
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "bahasa" ? "Hubungi" : "Contact"}
                </h3>
                <p className="text-base text-muted-foreground">
                  {locale === "bahasa"
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
              </div>

              <div className="space-y-6 pt-12">
                <h3 className="text-lg uppercase text-muted-foreground">
                  #AHMADXNORA
                </h3>
              </div>

              {/* COUNTDOWN Section */}
              <div className="space-y-6 pt-8">
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold">
                  {locale === "bahasa" ? "Menghitung Hari" : "Counting Down"}
                </h3>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-muted-foreground">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "bahasa" ? "Hari" : "Days"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-muted-foreground">
                      {timeLeft.hours}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "bahasa" ? "Jam" : "Hours"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-muted-foreground">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "bahasa" ? "Minit" : "Minutes"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-muted-foreground">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                      {locale === "bahasa" ? "Saat" : "Seconds"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="pt-12 pb-4">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground/50 font-light tracking-wide">
                    {locale === "bahasa" ? "Dicipta oleh" : "Created by"}
                  </p>
                  <p className="text-xl text-muted-foreground/60 font-serif tracking-wider">
                    ekad-semua
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right Curtain Panel */}
      <div
        onClick={openCurtain}
        className={cn(
          "fixed top-0 right-0 w-1/2 h-screen z-50 cursor-pointer",
          "bg-white shadow-[inset_0px_0px_10px_rgba(0,0,0,0.5)]",
          "transition-all duration-1000 ease-out",
          isOpen ? "translate-x-full invisible" : "translate-x-0",
        )}
      ></div>

      {/* Circular Badge with Initials - Centered between curtains */}
      <div
        onClick={openCurtain}
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 cursor-pointer",
          "transition-opacity duration-500",
          isOpen ? "opacity-0 invisible" : "opacity-100",
        )}
      >
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-muted/30 border-2 border-muted-foreground/40 flex items-center justify-center shadow-lg backdrop-blur-sm flex-col space-y-4">
          <p className="text-2xl md:text-4xl font-display font-light text-muted-foreground tracking-wider">
            {firstPerson.nickname.charAt(0).toUpperCase()}
            <span className="font-serif italic mx-1">&</span>
            {secondPerson.nickname.charAt(0).toUpperCase()}
          </p>
          <p className="text-lg md:text-xl text-center text-gray-600 font-light">
            {locale === "bahasa" ? "Buka" : "Open"}
          </p>
        </div>
      </div>
    </div>
  );
}

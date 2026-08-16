"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Gift,
  Sparkles,
  ArrowDown,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Lock,
  Trophy,
  Camera,
} from "lucide-react";

/* =========================================================
   MEMORIES
========================================================= */

const memories = [
  {
    image: "/memories/1.jpeg",
    title: "The Good Times",
    text: "Some moments become memories that we never forget.",
  },
  {
    image: "/memories/2.jpeg",
    title: "Crazy Moments",
    text: "The laughs, the fights, the nonsense... everything counts.",
  },
  {
    image: "/memories/3.jpeg",
    title: "Always Together",
    text: "No matter where life takes us, we'll always be brothers.",
  },
  {
    image: "/memories/4.jpeg",
    title: "More To Come",
    text: "This is just the beginning of many more memories.",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function BirthdayPage() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(3);
  const [revealed, setRevealed] = useState(false);
  const [finalReveal, setFinalReveal] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* =========================================================
     START SURPRISE + MUSIC
  ========================================================= */

  const startSurprise = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.75;
        audioRef.current.currentTime = 0;

        await audioRef.current.play();
        setMusicPlaying(true);
      }
    } catch (error) {
      console.error("Music could not start:", error);
    }

    setStarted(true);
  };

  /* =========================================================
     MUSIC CONTROL
  ========================================================= */

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        console.error("Music could not start:", error);
      }
    }
  };

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  useEffect(() => {
    if (!started || revealed) return;

    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setRevealed(true);

      confetti({
        particleCount: 250,
        spread: 150,
        origin: { y: 0.6 },
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [started, count, revealed]);

  /* =========================================================
     FINAL CELEBRATION
  ========================================================= */

  const finalCelebration = () => {
    setFinalReveal(true);

    const duration = 6000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 12,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 12,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  /* =========================================================
     SECRET EASTER EGG
  ========================================================= */

  const openSecret = () => {
    setSecretOpen(true);

    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 },
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050509] text-white">

      {/* =====================================================
          MUSIC
      ===================================================== */}

      <audio
        ref={audioRef}
        src="/birthday.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">

        {/* =====================================================
            INTRO
        ===================================================== */}

        {!started ? (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative flex min-h-screen items-center justify-center px-6"
          >
            <Stars />

            <div className="relative z-10 max-w-2xl text-center">

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="mx-auto mb-8 inline-flex rounded-full border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                <Gift size={52} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4 text-sm uppercase tracking-[0.5em] text-white/50"
              >
                A little surprise
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-5xl font-black tracking-tight sm:text-7xl"
              >
                Hey Mohit...
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mx-auto mt-6 max-w-lg text-lg leading-8 text-white/60"
              >
                I made something special for you.
                <br />
                But there's only one way to find out what it is.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSurprise}
                className="group mt-10 rounded-full bg-white px-8 py-4 font-bold text-black shadow-2xl"
              >
                Don't Click This 👀

                <Sparkles
                  className="ml-2 inline-block transition-transform group-hover:rotate-12"
                  size={18}
                />
              </motion.button>

              <p className="mt-5 text-xs text-white/30">
                Seriously... don't.
              </p>

            </div>
          </motion.section>

        ) : !revealed ? (

          /* =====================================================
             COUNTDOWN
          ===================================================== */

          <motion.section
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen items-center justify-center"
          >
            <Stars />

            <motion.div
              key={count}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="relative z-10 text-center"
            >
              <p className="mb-6 text-sm uppercase tracking-[0.5em] text-white/40">
                Something is coming...
              </p>

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="text-[10rem] font-black leading-none sm:text-[15rem]"
              >
                {count === 0 ? "🎉" : count}
              </motion.div>
            </motion.div>
          </motion.section>

        ) : (

          /* =====================================================
             MAIN BIRTHDAY EXPERIENCE
          ===================================================== */

          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            {/* =================================================
                HERO
            ================================================= */}

            <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

              <Stars />
              <Balloons />

              <div className="relative z-10 text-center">

                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 12,
                  }}
                  className="mb-8 text-7xl"
                >
                  🎂
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 uppercase tracking-[0.5em] text-white/50"
                >
                  Today is your day
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5,
                    type: "spring",
                  }}
                  className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-5xl font-black text-transparent sm:text-7xl md:text-8xl"
                >
                  HAPPY
                  <br />
                  BIRTHDAY
                  <br />
                  MOHIT ❤️
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/60"
                >
                  Another year older.
                  <br />
                  Another year of memories.
                  <br />
                  And somehow you're still annoying me. 😂
                </motion.p>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-32 left-1/2 -translate-x-1/2"
                >
                  <ArrowDown className="text-white/30" />
                </motion.div>

              </div>

            </section>

            {/* =================================================
                MUSIC VISUALIZER
            ================================================= */}

            <section className="px-6 py-20">

              <Reveal>

                <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-xl">

                  <div className="flex items-center justify-center gap-1.5">

                    {Array.from({ length: 18 }).map((_, i) => (

                      <motion.span
                        key={i}
                        animate={{
                          height: musicPlaying
                            ? [8, 25 + (i % 5) * 7, 10]
                            : 8,
                        }}
                        transition={{
                          duration: 0.5 + (i % 4) * 0.1,
                          repeat: musicPlaying ? Infinity : 0,
                          delay: i * 0.04,
                        }}
                        className="w-1.5 rounded-full bg-white"
                      />

                    ))}

                  </div>

                  <p className="mt-5 text-xs uppercase tracking-[0.4em] text-white/30">
                    {musicPlaying
                      ? "Now Playing • Birthday Music 🎵"
                      : "Music Paused"}
                  </p>

                </div>

              </Reveal>

            </section>

            {/* =================================================
                16 AUG
            ================================================= */}

            <section className="relative overflow-hidden px-6 py-32">

              <div className="mx-auto max-w-4xl text-center">

                <Reveal>

                  <motion.div
                    animate={{
                      rotate: [-3, 3, -3],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="mx-auto mb-10 inline-block rounded-3xl border border-yellow-400/20 bg-yellow-400/5 px-8 py-6 backdrop-blur-xl"
                  >

                    <p className="text-sm uppercase tracking-[0.4em] text-yellow-300/60">
                      Mark this date 😂
                    </p>

                    <h2 className="mt-3 text-5xl font-black sm:text-7xl">
                      16 AUG
                    </h2>

                    <p className="mt-2 text-xl font-bold text-yellow-300">
                      MOHIT DAY 🎂
                    </p>

                  </motion.div>

                  <p className="mx-auto max-w-xl text-lg leading-8 text-white/50">
                    Apparently, the world decided that{" "}
                    <span className="font-bold text-white">
                      16 August
                    </span>{" "}
                    needed one extremely important event...
                  </p>

                  <p className="mt-5 text-2xl font-black">
                    Your birthday. Obviously. 😌
                  </p>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <section className="relative px-6 py-32">

              <div className="mx-auto max-w-4xl text-center">

                <Reveal>

                  <Sparkles
                    className="mx-auto mb-8"
                    size={30}
                  />

                  <h2 className="text-4xl font-bold sm:text-6xl">
                    More than just a brother.
                  </h2>

                  <p className="mx-auto mt-10 max-w-2xl text-lg leading-9 text-white/50">
                    We've grown up together, fought over stupid things,
                    laughed at even stupider things, and created memories
                    that I'll carry forever.
                  </p>

                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/50">
                    Life keeps changing, but one thing won't:
                    <span className="text-white">
                      {" "}
                      you'll always be my brother.
                    </span>
                  </p>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                MEMORIES
            ================================================= */}

            <section className="relative px-6 py-32">

              <div className="mx-auto max-w-6xl">

                <Reveal>

                  <div className="mb-16 text-center">

                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/30">
                      Chapter One
                    </p>

                    <h2 className="text-4xl font-black sm:text-6xl">
                      Our Memories 📸
                    </h2>

                    <p className="mt-5 text-white/40">
                      Click a photo for the full-screen surprise.
                    </p>

                  </div>

                </Reveal>

                <div className="grid gap-8 md:grid-cols-2">

                  {memories.map((memory, index) => (

                    <Reveal
                      key={memory.image}
                      delay={index * 0.1}
                    >

                      <motion.div
                        whileHover={{
                          y: -10,
                          rotate:
                            index % 2 === 0 ? -1 : 1,
                        }}
                        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                      >

                        <button
                          onClick={() =>
                            setSelectedPhoto(memory.image)
                          }
                          className="relative mt-0 block w-full overflow-hidden rounded-none bg-transparent p-0 shadow-none"
                        >

                          <img
                            src={memory.image}
                            alt={memory.title}
                            className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">

                            <Maximize2
                              className="scale-75 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                              size={35}
                            />

                          </div>

                        </button>

                        <div className="p-7">

                          <h3 className="text-2xl font-bold">
                            {memory.title}
                          </h3>

                          <p className="mt-3 leading-7 text-white/50">
                            {memory.text}
                          </p>

                        </div>

                      </motion.div>

                    </Reveal>

                  ))}

                </div>

              </div>

            </section>

            {/* =================================================
                TIMELINE
            ================================================= */}

            <section className="relative px-6 py-32">

              <div className="mx-auto max-w-4xl">

                <Reveal>

                  <div className="text-center">

                    <p className="text-sm uppercase tracking-[0.4em] text-white/30">
                      Chapter Two
                    </p>

                    <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                      From Then To Now 🕐
                    </h2>

                  </div>

                </Reveal>

                <div className="relative mt-20">

                  <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-1/2" />

                  {[
                    {
                      year: "THEN",
                      emoji: "👶",
                      title: "The Beginning",
                      text: "Two brothers. One childhood. Infinite chaos.",
                    },
                    {
                      year: "MEMORIES",
                      emoji: "😂",
                      title: "The Crazy Years",
                      text: "Arguments, jokes, adventures and moments we'll never forget.",
                    },
                    {
                      year: "TODAY",
                      emoji: "🎂",
                      title: "16 August",
                      text: "The birthday boy has officially leveled up.",
                    },
                    {
                      year: "NEXT",
                      emoji: "🚀",
                      title: "The Future",
                      text: "More adventures, more success and many more memories.",
                    },
                  ].map((item, index) => (

                    <Reveal
                      key={item.year}
                      delay={index * 0.1}
                    >

                      <div
                        className={`relative mb-12 flex items-start gap-6 sm:gap-10 ${
                          index % 2 === 0
                            ? "sm:flex-row"
                            : "sm:flex-row-reverse"
                        }`}
                      >

                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#08080d] text-xl">
                          {item.emoji}
                        </div>

                        <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">

                          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                            {item.year}
                          </p>

                          <h3 className="mt-3 text-2xl font-bold">
                            {item.title}
                          </h3>

                          <p className="mt-3 leading-7 text-white/50">
                            {item.text}
                          </p>

                        </div>

                      </div>

                    </Reveal>

                  ))}

                </div>

              </div>

            </section>

            {/* =================================================
                MOHIT ROAST REPORT
            ================================================= */}

            <section className="relative overflow-hidden px-6 py-32">

              <div className="mx-auto max-w-4xl text-center">

                <Reveal>

                  <p className="mb-4 text-sm uppercase tracking-[0.4em] text-red-300/50">
                    ⚠️ Classified Information
                  </p>

                  <h2 className="text-4xl font-black sm:text-6xl">
                    The Official Mohit Report 😂
                  </h2>

                  <p className="mx-auto mt-6 max-w-xl text-white/40">
                    After years of extensive research, observation,
                    and unnecessary arguments...
                  </p>

                </Reveal>

                <div className="mx-auto mt-14 grid max-w-2xl gap-4">

                  {[
                    {
                      title: "Age",
                      value: "+1",
                      emoji: "🎂",
                    },
                    {
                      title: "Wisdom",
                      value: "Still Loading...",
                      emoji: "🧠",
                    },
                    {
                      title: "Annoying Level",
                      value: "100%",
                      emoji: "😭",
                    },
                    {
                      title: "Brother Level",
                      value: "⭐⭐⭐⭐⭐",
                      emoji: "❤️",
                    },
                    {
                      title: "Coolness",
                      value: "Under Investigation",
                      emoji: "😎",
                    },
                  ].map((item, index) => (

                    <Reveal
                      key={item.title}
                      delay={index * 0.08}
                    >

                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          x: 8,
                        }}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-xl"
                      >

                        <div className="flex items-center gap-4">

                          <span className="text-2xl">
                            {item.emoji}
                          </span>

                          <span className="text-white/50">
                            {item.title}
                          </span>

                        </div>

                        <span className="font-bold text-white">
                          {item.value}
                        </span>

                      </motion.div>

                    </Reveal>

                  ))}

                </div>

                <Reveal delay={0.5}>

                  <motion.p
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="mt-12 text-lg font-bold"
                  >
                    Despite all these defects...
                    <br />
                    we still love you. 😂❤️
                  </motion.p>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                BROTHER QUIZ
            ================================================= */}

            <section className="relative px-6 py-32">

              <div className="mx-auto max-w-3xl text-center">

                <Reveal>

                  <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/30">
                    Brother Test 🎮
                  </p>

                  <h2 className="text-4xl font-black sm:text-6xl">
                    How Well Do You Know Mohit?
                  </h2>

                  <p className="mt-6 text-white/40">
                    Let's see if you can survive the ultimate
                    brother quiz. 😂
                  </p>

                </Reveal>

                {/* ⭐ THIS WAS MISSING IN YOUR OLD CODE ⭐ */}
                <Quiz />

              </div>

            </section>

            {/* =================================================
                BROTHER SECTION
            ================================================= */}

            <section className="relative overflow-hidden px-6 py-40">

              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

              <div className="relative mx-auto max-w-3xl text-center">

                <Reveal>

                  <Heart
                    className="mx-auto mb-10"
                    size={38}
                  />

                  <h2 className="text-4xl font-black leading-tight sm:text-6xl">
                    No matter how old we get...
                  </h2>

                  <p className="mt-10 text-xl leading-10 text-white/50">
                    I'll still be there to annoy you,
                    <br />
                    roast you,
                    <br />
                    laugh with you,
                    <br />
                    and stand beside you.
                  </p>

                  <p className="mt-12 text-2xl font-bold">
                    That's what brothers are for. ❤️
                  </p>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                PERSONAL LETTER
            ================================================= */}

            <section className="relative overflow-hidden px-6 py-40">

              <div className="mx-auto max-w-3xl">

                <Reveal>

                  <div className="relative rounded-[2rem] border border-white/10 bg-[#111116] p-8 shadow-2xl sm:p-14">

                    <div className="absolute right-6 top-6 text-2xl opacity-30">
                      ✨
                    </div>

                    <div className="absolute bottom-6 left-6 text-2xl opacity-20">
                      ❤️
                    </div>

                    <p className="text-xs uppercase tracking-[0.4em] text-white/30">
                      A letter for Mohit
                    </p>

                    <h2 className="mt-8 text-4xl font-black sm:text-5xl">
                      Dear Mohit,
                    </h2>

                    <div className="mt-10 space-y-6 text-lg leading-9 text-white/50">

                      <p>
                        I don't say it enough, but I'm genuinely
                        lucky to have you as my brother.
                      </p>

                      <p>
                        We've had our fights, our stupid arguments,
                        our random laughs, and countless moments
                        that probably made absolutely no sense
                        to anyone else.
                      </p>

                      <p>
                        But those are exactly the moments I'll remember.
                      </p>

                      <p>
                        As you start another year of your life,
                        I hope you achieve everything you're working for.
                        Keep growing, keep laughing, keep being yourself.
                      </p>

                      <p className="text-white">
                        And no matter how old we get,
                        I'll always have your back.
                      </p>

                    </div>

                    <div className="mt-12 border-t border-white/10 pt-8">

                      <p className="font-serif text-3xl italic">
                        — Rohit ❤️
                      </p>

                      <p className="mt-2 text-sm text-white/30">
                        Your permanently BDA brother 😂
                      </p>

                    </div>

                  </div>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                SECRET EASTER EGG
            ================================================= */}

            <section className="relative px-6 py-24">

              <div className="mx-auto max-w-3xl text-center">

                <Reveal>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={openSecret}
                    className="mt-0 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm text-white/40 shadow-none backdrop-blur-xl"
                  >
                    <Lock
                      size={16}
                      className="mr-2 inline"
                    />
                    Don't Press This...
                  </motion.button>

                </Reveal>

              </div>

            </section>

            {/* =================================================
                FINAL SURPRISE
            ================================================= */}

            <section className="relative flex min-h-screen items-center justify-center px-6">

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

              <div className="relative z-10 text-center">

                {!finalReveal ? (

                  <Reveal>

                    <Gift
                      className="mx-auto mb-10"
                      size={45}
                    />

                    <p className="mb-5 text-sm uppercase tracking-[0.5em] text-white/30">
                      One last thing...
                    </p>

                    <h2 className="text-4xl font-black sm:text-6xl">
                      I saved something
                      <br />
                      for you.
                    </h2>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow:
                          "0 0 50px rgba(255,255,255,.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={finalCelebration}
                      className="mt-12 rounded-full border border-white/20 bg-white px-10 py-5 font-bold text-black"
                    >
                      Open Your Gift 🎁
                    </motion.button>

                  </Reveal>

                ) : (

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                    }}
                  >

                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                      className="mb-10 text-8xl"
                    >
                      ❤️
                    </motion.div>

                    <h2 className="text-5xl font-black sm:text-7xl">
                      HAPPY
                      <br />
                      BIRTHDAY!
                    </h2>

                    <p className="mx-auto mt-10 max-w-2xl text-xl leading-9 text-white/60">
                      I hope this year brings you everything
                      you've been working for.
                    </p>

                    <p className="mt-6 text-2xl font-bold">
                      Love you, bro. ❤️
                    </p>

                    <div className="mt-12 flex justify-center gap-5 text-3xl">
                      🎂 🎉 🥳 🎁 ✨
                    </div>

                    <p className="mt-12 text-sm uppercase tracking-[0.4em] text-white/30">
                      16 AUG — NEVER FORGET 😂
                    </p>

                  </motion.div>

                )}

              </div>

            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="border-t border-white/10 px-6 py-10 text-center">

              <p className="text-sm text-white/40">
                Made with{" "}
                <span className="text-red-400">
                  ❤️
                </span>
              </p>

              <p className="mt-2 text-sm text-white/40">
                Made by{" "}
                <span className="font-semibold text-white">
                  Rohit
                </span>{" "}
                ✨
              </p>

              <p className="mt-2 text-sm text-white/40">
                Made for the{" "}
                <span className="font-semibold text-white">
                  Birthday Boy — Mohit
                </span>{" "}
                🎂
              </p>

              <p className="mt-4 text-xs tracking-widest text-white/20">
                16 AUGUST • MOHIT DAY
              </p>

            </footer>

          </motion.div>
        )}

      </AnimatePresence>

      {/* =====================================================
          MUSIC CONTROL
      ===================================================== */}

      {started && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur-xl"
        >
          {musicPlaying ? (
            <>
              <Volume2 size={18} />
              Music On
            </>
          ) : (
            <>
              <VolumeX size={18} />
              Music Off
            </>
          )}
        </motion.button>
      )}

      {/* =====================================================
          FULLSCREEN PHOTO
      ===================================================== */}

      <AnimatePresence>

        {selectedPhoto && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-6 top-6 z-10 mt-0 rounded-full border border-white/10 bg-white/10 p-3 text-white shadow-none"
            >
              <X size={24} />
            </button>

            <motion.img
              initial={{
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.7,
                opacity: 0,
              }}
              src={selectedPhoto}
              alt="Birthday memory"
              className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

          </motion.div>

        )}

      </AnimatePresence>

      {/* =====================================================
          SECRET EASTER EGG
      ===================================================== */}

      <AnimatePresence>

        {secretOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 px-6 backdrop-blur-xl"
          >

            <motion.div
              initial={{
                scale: 0.5,
                rotate: -5,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              className="max-w-lg rounded-[2rem] border border-white/10 bg-[#111116] p-10 text-center shadow-2xl"
            >

              <div className="text-7xl">
                💀
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.4em] text-red-300/50">
                WARNING
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Mohit.exe
                <br />
                Has Stopped Working 😂
              </h2>

              <p className="mt-6 leading-8 text-white/50">
                Too much birthday energy detected.
                <br />
                Please restart Mohit and try again.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setSecretOpen(false)}
                className="mt-8 rounded-full bg-white px-7 py-4 font-bold text-black"
              >
                Restart Mohit 😂
              </motion.button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   STARS
   Deterministic → no hydration error
========================================================= */

function Stars() {
  const stars = [
    [5, 10],
    [12, 35],
    [18, 70],
    [25, 20],
    [32, 55],
    [38, 85],
    [45, 15],
    [52, 42],
    [58, 75],
    [65, 25],
    [72, 60],
    [78, 90],
    [85, 35],
    [92, 12],
    [97, 70],
    [8, 82],
    [15, 50],
    [22, 8],
    [30, 92],
    [42, 65],
    [48, 30],
    [55, 95],
    [62, 10],
    [68, 48],
    [75, 72],
    [82, 18],
    [88, 82],
    [95, 45],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {stars.map(([left, top], i) => (

        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          style={{
            left: `${left}%`,
            top: `${top}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + (i % 4),
            repeat: Infinity,
            delay: (i % 5) * 0.4,
          }}
        />

      ))}

    </div>
  );
}

/* =========================================================
   BALLOONS
   SSR SAFE
========================================================= */

function Balloons() {
  const balloons = [
    { left: "5%", delay: 0, duration: 9 },
    { left: "20%", delay: 1, duration: 11 },
    { left: "37%", delay: 2, duration: 10 },
    { left: "55%", delay: 0.5, duration: 12 },
    { left: "72%", delay: 1.5, duration: 10 },
    { left: "88%", delay: 3, duration: 11 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {balloons.map((balloon, i) => (

        <motion.div
          key={i}
          className="absolute text-5xl"
          style={{
            left: balloon.left,
            bottom: "-100px",
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [
              0,
              i % 2 === 0 ? 30 : -30,
              0,
            ],
            rotate: [
              0,
              i % 2 === 0 ? 8 : -8,
              0,
            ],
          }}
          transition={{
            duration: balloon.duration,
            repeat: Infinity,
            delay: balloon.delay,
            ease: "linear",
          }}
        >
          🎈
        </motion.div>

      ))}

    </div>
  );
}

/* =========================================================
   BROTHER QUIZ
========================================================= */

function Quiz() {

  const questions = [
    {
      question: "Who is more annoying? 😂",
      options: [
        "Rohit",
        "Mohit",
        "Both 💀",
      ],
      answer: 2,
    },
    {
      question: "Who wins most arguments?",
      options: [
        "Rohit",
        "Mohit",
        "Nobody 😭",
      ],
      answer: 2,
    },
    {
      question: "Who is the actual birthday legend?",
      options: [
        "Rohit 😎",
        "Mohit 🎂",
        "Obviously Mohit ❤️",
      ],
      answer: 2,
    },
    {
      question: "Who is secretly the favorite brother?",
      options: [
        "Rohit 😏",
        "Mohit 👑",
        "It's a secret 🤫",
      ],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const chooseAnswer = (index: number) => {

    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {

      if (current === questions.length - 1) {

        setFinished(true);

      } else {

        setCurrent((prev) => prev + 1);
        setSelected(null);

      }

    }, 800);
  };

  if (finished) {

    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
      >

        <Trophy
          size={60}
          className="mx-auto"
        />

        <h3 className="mt-6 text-3xl font-black">
          Quiz Completed!
        </h3>

        <p className="mt-4 text-white/50">
          Congratulations Mohit.
          <br />
          You officially survived the brother test. 😂
        </p>

        <div className="mt-8 text-5xl font-black">
          {score}/{questions.length}
        </div>

        <p className="mt-4 text-xl font-bold">
          {score === questions.length
            ? "Perfect Score! Certified Birthday Legend 🏆"
            : "Certified Birthday Legend Anyway 🎂"}
        </p>

      </motion.div>
    );
  }

  return (
    <motion.div
      key={current}
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
    >

      <p className="text-sm text-white/30">
        Question {current + 1} / {questions.length}
      </p>

      <div className="mx-auto mt-3 h-1 max-w-md overflow-hidden rounded-full bg-white/10">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
          className="h-full bg-white"
        />

      </div>

      <h3 className="mt-8 text-2xl font-bold">
        {question.question}
      </h3>

      <div className="mt-8 grid gap-3">

        {question.options.map((option, index) => {

          const isSelected = selected === index;
          const isCorrect = index === question.answer;

          return (
            <motion.button
              key={option}
              whileHover={
                selected === null
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                selected === null
                  ? { scale: 0.97 }
                  : {}
              }
              onClick={() => chooseAnswer(index)}
              className={`mt-0 w-full rounded-2xl border px-5 py-4 text-left transition ${
                selected !== null && isCorrect
                  ? "border-green-400 bg-green-400/10 text-green-300"
                  : isSelected
                  ? "border-red-400 bg-red-400/10 text-red-300"
                  : "border-white/10 bg-white/[0.03] text-white hover:bg-white/10"
              }`}
            >
              {option}

              {selected !== null && isCorrect && (
                <span className="float-right">
                  ✓
                </span>
              )}

            </motion.button>
          );

        })}

      </div>

    </motion.div>
  );
}
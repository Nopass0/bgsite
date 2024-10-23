// components/Portfolio.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

// Create motion components
const MotionCard = motion(Card);
const MotionDiv = motion.div;

const Portfolio = () => {
  const projects = [
    {
      title: "NetFolders",
      image: "https://placehold.jp/3d348b/e0e2db/400x200.png",
      description:
        "Файловый сервер, который решает проблему повторения файлов, хранящихся на разных серверах, путем вынесения их на отдельный сервер. Проект позволяет запускать сервер для хранения и передачи файлов с высокой скоростью и безопасностью.",
    },
    {
      title: "Invvo",
      image: "https://placehold.jp/e6af2e/191716/400x200.png",
      description:
        "Разработка аналитики, элементов графов и подсчет статистики для Invvo. Проект включал анализ данных и визуализацию через графы.",
      link: "https://invvo.com",
      linkText: "Посмотреть сайт",
    },
    {
      title: "ITKaba",
      image: "https://placehold.jp/beb7a4/191716/400x200.png",
      description:
        "Проект для стартапа с нуля, включал разработку всего проекта. На данный момент сайт не доступен из-за инвестиционного раунда.",
      link: "https://www.figma.com/design/dG0APn4kcwY3T6AUhxFLaW/МЖП-Реклама?node-id=0-20389&t=pCECr106Aa9cvosW-0",
      linkText: "Figma",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#191716] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Business Card */}
        <AnimatePresence>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Card className="mx-auto w-full max-w-lg overflow-hidden bg-[#E6AF2E]">
              <CardContent className="flex flex-col items-center p-8">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-3xl font-bold text-[#191716] sm:text-4xl"
                >
                  Богдан - Fullstack Developer
                </MotionDiv>
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="https://t.me/pbgal"
                    className="mt-6 inline-flex items-center gap-3 rounded-lg bg-[#191716] px-8 py-4 text-lg font-medium text-[#E6AF2E] transition-all hover:bg-[#3d348b]"
                  >
                    <Send className="h-5 w-5" />
                    Связаться через Telegram
                  </Link>
                </MotionDiv>
              </CardContent>
            </Card>
          </MotionDiv>
        </AnimatePresence>

        {/* Portfolio Carousel */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-6xl"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                  <MotionDiv
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="h-full bg-[#E6AF2E]">
                      <CardContent className="flex h-full flex-col p-5">
                        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-[#191716]">
                          {project.title}
                        </h3>
                        <p className="flex-grow text-[#191716]">
                          {project.description}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            className="mt-4 inline-block text-[#3d348b] underline transition-colors hover:text-[#191716]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.linkText}
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  </MotionDiv>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-[#E6AF2E] text-[#E6AF2E] hover:bg-[#3d348b]" />
            <CarouselNext className="border-[#E6AF2E] text-[#E6AF2E] hover:bg-[#3d348b]" />
          </Carousel>
        </MotionDiv>
      </div>
    </main>
  );
};

export default Portfolio;

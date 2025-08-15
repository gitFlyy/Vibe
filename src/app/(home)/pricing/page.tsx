"use client"

import Image from "next/image";
import { PricingTable } from "@clerk/nextjs"
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/use-current-theme";

const PricingPage = () => {
  const currentTheme = useCurrentTheme();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
        <section className="space-y-6 pt-[16vh] 2xl:pt-48">
            <div className="flex flex-col items-center">
            <Image
              src="/logo.svg"
              alt="vibe"
              width={50}
              height={50}
              className="hidden md:block"
            />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
            <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
                Choose the plan that fits your needs.
            </p>
        </section>
      <PricingTable
        appearance={{
            baseTheme: currentTheme === "dark" ? dark : undefined,
             elements: {
                pricingTableCard: "border! shadow-none! rounded-lg!",
                pricingTableCardButton: "bg-primary! text-primary-foreground! hover:bg-primary/90!",
                pricingTableCardTitle: "text-foreground!",
                pricingTableCardDescription: "text-muted-foreground!",
                pricingTableCardPrice: "text-foreground!",
                pricingTableCardFeature: "text-foreground!",
            },
            variables: {
                colorPrimary: "#4F46E5",
                colorBackground: currentTheme === "dark" ? "#0a0a0a" : "#ffffff",
                colorText: currentTheme === "dark" ? "#ffffff" : "#000000",
                colorTextSecondary: currentTheme === "dark" ? "#a1a1aa" : "#6b7280",
            }
        }}
      />
    </div>
  );
};

export default PricingPage;
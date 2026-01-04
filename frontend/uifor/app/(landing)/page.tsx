"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/Maxwidthwrapper";
import { Heading } from "@/components/Headings";
import { Check, AlertCircle, FileText, Clock, Zap, Building2, Brain, Shield, Users, Rocket} from "lucide-react";
import { ShinyButton } from "@/components/ShinyButton";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if(!token) return
    async function checkUser(){
     try {
       const res = await fetch("http://localhost:8000/api/v1/users/me",
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`
           }
         }
       )
    if(!res.ok){
        localStorage.removeItem("jwt")
        router.replace("/")
       }
     } catch (error) {
      console.error("Auth check fail.", error)
     }
    }

    checkUser()

  }, [router]);

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
        <MaxWidthWrapper className="text-center">
        <div className="relative mx-auto text-center flex flex-col items-center gap-10">
          <div>
            <Heading>
              AI That Takes Legal Responsibility Seriously
            </Heading>
          </div>
          <p className="text-base/7">
          RegulAI is a compliance reasoning engine that delivers <span className="font-semibold text-blue-400">jurisdiction-aware, actionable regulatory guidance</span> — not generic answers
          </p>
          <ul className="space-y-2 text-base/7 text-left flex flex-col items-start">
          {[
            "Step-by-step compliance actions", "Clear deadlines and penalties", "Verified regulation references", 
            ].map((item, index) => (
              <li key={index} className="flex gap-1.5 items-center text-left">
                <Check className="size-5 shrink-0 text-neutral-200" />
                {item}
                </li>
            ))}
          </ul>

          <div className="w-full max-w-80">
            <ShinyButton
            href="/auth/signup"
            className="relative z-10 h-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
              Get Started today
            </ShinyButton>
          </div>
        </div>
        </MaxWidthWrapper>
      </section>


      <section className="relative py-24 sm:py-32 bg-linear-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]">
        <MaxWidthWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <AlertCircle className="size-5 text-red-400" />
                <span className="text-sm font-medium text-red-300">The Problem</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl mb-6">
                Compliance is complex — businesses often fail
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Fragmented Regulations",
                  description: "Rules scattered across different jurisdictions, making it hard to know what applies to your business"
                },
                {
                  icon: AlertCircle,
                  title: "Complex Legal Language",
                  description: "Dense terminology that's difficult to interpret without expensive legal consultation"
                },
                {
                  icon: Clock,
                  title: "Missed Deadlines = Fines",
                  description: "One overlooked deadline can result in penalties, legal issues, or business disruption"
                }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-lg bg-linear-to-br from-[#1e293b] to-[#312e81] border border-neutral-700/50">
                  <item.icon className="size-10 text-red-400 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

       <section className="relative py-24 sm:py-32 bg-[#0f172a]">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl mb-4">
              How RegulAI Helps
            </h2>
            <p className="text-base text-neutral-400">
              From confusion to compliance in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: Building2,
                title: "Identify Your Business",
                description: "Tell us your jurisdiction, industry, and business type"
              },
              {
                step: "02",
                icon: FileText,
                title: "Map Regulations",
                description: "We identify which regulations apply specifically to you"
              },
              {
                step: "03",
                icon: Zap,
                title: "Get Clear Actions",
                description: "Receive step-by-step guidance with deadlines and requirements"
              },
              {
                step: "04",
                icon: Clock,
                title: "Track Compliance",
                description: "Monitor your obligations and never miss a deadline"
              }
            ].map((item, index) => (
              <div key={index} className="relative p-6 rounded-lg bg-linear-to-br from-[#1e293b] to-[#312e81] border border-neutral-700/50 hover:border-blue-500/50 transition-all">
                <div className="text-4xl font-bold text-white mb-3">{item.step}</div>
                <item.icon className="size-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative py-24 sm:py-32 bg-linear-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl mb-4">
              Why RegulAI Matters
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            
            {/* Large card */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-linear-to-br from-[#1e293b] to-[#312e81] border border-neutral-700/50 hover:border-blue-500/50 transition-all">
              <Check className="size-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-neutral-100 mb-3">
                Step-by-Step Compliance Actions
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                No more guessing or generic advice. Get precise, actionable steps tailored to your business and jurisdiction. Each action comes with clear instructions on what to do, when to do it, and who to contact.
              </p>
            </div>

            {/* Small card */}
            <div className="p-8 rounded-2xl bg-linear-to-br from-[#312e81] to-[#1e293b] border border-neutral-700/50 hover:border-blue-500/50 transition-all">
              <Clock className="size-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-3">
                Clear Deadlines
              </h3>
              <p className="text-neutral-400 text-sm">
                Know exactly when things are due and what happens if you miss them
              </p>
            </div>

            {/* Small card */}
            <div className="p-8 rounded-2xl bg-linear-to-br from-[#0f172a] to-[#1e293b] border border-neutral-700/50 hover:border-blue-500/50 transition-all">
              <Shield className="size-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-3">
                Verified References
              </h3>
              <p className="text-neutral-400 text-sm">
                Every answer includes official regulation citations you can verify
              </p>
            </div>

            {/* Large card */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-linear-to-br from-[#1e293b] to-[#0f172a] border border-neutral-700/50 hover:border-blue-500/50 transition-all">
              <Brain className="size-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-neutral-100 mb-3">
                Stateful Guidance
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                RegulAI remembers your compliance journey. It tracks what you've completed, what's pending, and adjusts future guidance based on your history. No repetitive questions or contradictory advice.
              </p>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>

    
    <section className="relative py-24 sm:py-32 bg-linear-to-br from-[#1e293b] via-[#312e81] to-[#1e293b]">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl mb-4">
              Who Can Benefit from RegulAI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: "Startups & SMEs",
                description: "Navigate complex regulations without hiring expensive consultants. Get compliance right from day one.",
                benefits: ["Company registration guidance", "Licensing requirements", "Tax obligations"]
              },
              {
                icon: Building2,
                title: "Compliance Teams",
                description: "Streamline compliance workflows with AI-powered guidance that remembers your context.",
                benefits: ["Centralized tracking", "Deadline management", "Risk assessment"]
              },
              {
                icon: Users,
                title: "Business Owners",
                description: "Anyone who wants certainty, not guesswork. Make informed decisions with verified information.",
                benefits: ["Clear action steps", "Official references", "Peace of mind"]
              }
            ].map((item, index) => (
              <div key={index} className="p-8 rounded-lg bg-[#0f172a]/50 border border-neutral-700/50 hover:border-blue-500/50 transition-all">
                <item.icon className="size-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-neutral-100 mb-3">{item.title}</h3>
                <p className="text-neutral-400 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-neutral-500">
                      <Check className="size-4 shrink-0 text-blue-500 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative py-24 sm:py-32 bg-[#0f172a]">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Shield className="size-5 text-green-400" />
              <span className="text-sm font-medium text-green-300">Built on Trust</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl mb-4">
              Accurate, Verified, and Risk-Aware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Jurisdiction Validation",
                description: "Every response is validated against your specific jurisdiction before being shown. No generic or irrelevant advice."
              },
              {
                icon: FileText,
                title: "Mandatory References",
                description: "All guidance includes official regulation citations. You can verify every claim against the source."
              },
              {
                icon: AlertCircle,
                title: "Risk Levels & Penalties",
                description: "Explicit warnings about potential consequences. Know the stakes before making decisions."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-lg bg-linear-to-br from-[#1e293b] to-[#0f172a] border border-neutral-700/50 text-center">
                <div className="inline-flex p-4 rounded-lg bg-blue-500/10 mb-4">
                  <item.icon className="size-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>


    </>
  );
}

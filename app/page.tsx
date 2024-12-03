import { ArrowUpRight, Flame, Heart, Laugh,  } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/Navbar'

const bots = [
  {
    name: "Roast Bot",
    description: "Get hilariously roasted by AI",
    icon: Flame,
    href: "/roast",
    gradient: "from-orange-400 to-red-500",
    btngradiant:
      "bg-gradient-to-r from-orange-300 to-red-400 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-200 opacity-50 group-hover:opacity-55 transition-opacity duration-300",
  },
  {
    name: "Rizz Bot",
    description: "Learn the art of smooth talking",
    icon: Heart,
    href: "/rizz",
    gradient: "from-pink-400 to-purple-500",
    btngradiant:
      "bg-gradient-to-r from-pink-300 to-purple-400 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-200 opacity-50 group-hover:opacity-55 transition-opacity duration-300",
  },
  {
    name: "Joke Bot",
    description: "Enjoy AI-generated jokes and puns",
    icon: Laugh,
    href: "/joke",
    gradient: "from-green-400 to-blue-500",
    btngradiant:
      "bg-gradient-to-r from-green-300 to-blue-400 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-200 opacity-50 group-hover:opacity-55 transition-opacity duration-300",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 to-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-stone-200 via-blue-500 to-teal-600">
            Welcome to AI-Verse
          </h1>
          <p className="text-xl text-gray-500">
            Get ready to vibe with bots that keep it real!
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bots.map((bot) => (
            <Card
              key={bot.name}
              className="bg-gray-800 border-gray-700 overflow-hidden relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${bot.gradient} opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
              ></div>
              <div className="relative z-10">
                <CardHeader>
                  <bot.icon className="w-16 h-16 mb-4 text-white" />
                  <CardTitle className="text-2xl font-bold text-white">
                    {bot.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{bot.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant={"default"}
                    className={`text-zinc-800 rounded-3xl ${bot.btngradiant} hover:bg-zinc-300`}
                  >
                    <Link href={bot.href}>Try {bot.name} </Link>
                    <ArrowUpRight size={20} />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}


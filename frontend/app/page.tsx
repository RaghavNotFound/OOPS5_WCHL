import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Briefcase, Award, TrendingUp, Users, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Prove Your Skills,
            <span className="text-accent"> Earn Rewards</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            VeriChain connects developers with opportunities through verified skill badges and code challenges. Build
            your reputation on-chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Coding
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How VeriChain Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Solve Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete coding challenges and technical assessments to earn verified skill badges (SBTs) on-chain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Earn Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build your verifiable skill portfolio with blockchain-backed credentials that employers can trust.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Get Hired</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apply to jobs with your verified skills and get paid through secure smart contract escrow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1,247</div>
              <div className="text-muted-foreground">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">892</div>
              <div className="text-muted-foreground">Jobs Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">3,456</div>
              <div className="text-muted-foreground">Skills Verified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$2.1M</div>
              <div className="text-muted-foreground">Paid Out</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VeriChain?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Verified Skills</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain-backed skill verification that employers can trust
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instant Payments</h3>
                <p className="text-sm text-muted-foreground">Smart contract escrow ensures fast, secure payments</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Global Network</h3>
                <p className="text-sm text-muted-foreground">Connect with developers and employers worldwide</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Career Growth</h3>
                <p className="text-sm text-muted-foreground">Build your reputation and advance your career</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Real Challenges</h3>
                <p className="text-sm text-muted-foreground">Solve practical problems that matter to businesses</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Portable Credentials</h3>
                <p className="text-sm text-muted-foreground">Your skills follow you across platforms and employers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Reputation?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers already earning with verified skills
          </p>
          <Button size="lg" className="text-lg px-8">
            Connect Wallet & Start
          </Button>
        </div>
      </section>
    </div>
  )
}

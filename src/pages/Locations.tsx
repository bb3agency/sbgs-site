import { ArrowRight, MapPin, Star } from 'lucide-react';

export default function Locations() {
  return (
    <div className="min-h-screen bg-surface text-[#1b1c19] p-2 md:p-4 font-sans selection:bg-brand-container selection:text-white flex flex-col">
      <main className="max-w-7xl mx-auto w-full h-full flex flex-col">
        {/* Header Section */}
        <div className="mb-2 md:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-2 shrink-0">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-bold text-brand-primary tracking-[0.15em] uppercase mb-1">
              Reach Us At
            </h2>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#1b1c19] mb-1.5 leading-tight">
              Our Branches
            </h1>
            <p className="text-[#5a5a55] text-xs md:text-sm leading-relaxed">
              Explore our carefully selected locations. Each branch maintains our 40-year legacy of purity with modern service standards.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 flex-1 min-h-0 grid-rows-4 md:grid-rows-2">

          {/* Tall Left Card: Main Hub */}
          <div className="md:col-span-1 md:row-span-2 bg-surface-lowest rounded-[16px] p-3 md:p-4 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(27,28,25,0.04)] hover:shadow-[0_32px_64px_-12px_rgba(27,28,25,0.08)] transition-all duration-500 group flex flex-col justify-between border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.571792585707!2d80.6719655!3d16.490150700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fae0b3d8ee27%3A0x4392c5d586a3c4!2sSai%20Baba%20Sweets%20%26%20Cool%20Drinks!5e1!3m2!1sen!2sin!4v1774768302550!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full scale-[1.25] origin-center transition-all duration-700 pointer-events-none border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md tracking-wide uppercase w-[fit-content]">
                  Main Hub
                </span>
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 backdrop-blur-md tracking-wide uppercase flex items-center gap-1 w-[fit-content]">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Open Now
                </span>
              </div>
              <div className="text-right bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
                <div className="text-[8px] font-bold text-white/70 uppercase tracking-widest mb-0.5">Rating</div>
                <div className="flex items-center gap-1 text-white font-bold text-xs">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> 4.3/5
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1 tracking-tight drop-shadow-md">Check Post Centre</h3>
                  <p className="text-white/80 text-[10px] md:text-xs mb-2 flex items-start gap-1 drop-shadow-md">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/70 shrink-0 mt-0.5" />
                    Auto Nagar Bus Stand
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <div className="flex flex-col gap-0.5 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
                      <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider">Timings</span>
                      <span className="text-[10px] md:text-xs font-semibold text-white">7 AM - 11 PM</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <a href="https://www.google.com/maps/place/Sai+Baba+Sweets+%26+Cool+Drinks,+Old+Check+Post+Center/data=!4m2!3m1!1s0x3a35fae0b3d8ee27:0x4392c5d586a3c4" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-black rounded-full font-bold text-[10px] md:text-xs hover:bg-gray-200 transition-all shadow-lg flex items-center gap-1.5 group/btn">
                    Locate <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Wide Top Right Card: One Town Heritage */}
          <div className="md:col-span-2 md:row-span-1 bg-surface-lowest rounded-[16px] p-3 md:p-4 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(27,28,25,0.04)] hover:shadow-[0_32px_64px_-12px_rgba(27,28,25,0.08)] transition-all duration-500 group flex items-center border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.657732298816!2d80.6186414!3d16.5161099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff0933758b9%3A0x33458c9f5635d033!2sSai%20Baba%20Sweets!5e1!3m2!1sen!2sin!4v1774768466601!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full scale-[1.25] origin-center transition-all duration-700 pointer-events-none border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 z-0"></div>
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between gap-3 md:gap-4 items-start md:items-center">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[8px] md:text-[9px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/20 text-white backdrop-blur-md tracking-wide uppercase">
                    Heritage Site
                  </span>
                  <span className="text-[9px] md:text-[10px] font-semibold text-white/80 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full">Est. 1984</span>
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-white mb-1 tracking-tight drop-shadow-md">One Town, Samarang Chowk</h3>
                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed drop-shadow-md">
                  Our flagship heritage location. Experience the original recipes served in a space that honors our four-decade journey.
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2 md:gap-3 shrink-0">
                <div className="flex gap-3 md:gap-4 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  <div className="text-right">
                    <div className="text-[7px] md:text-[8px] font-bold text-white/70 uppercase tracking-wider mb-0.5">Timings</div>
                    <div className="text-[9px] md:text-[10px] font-semibold text-white">9 AM - 10 PM</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7px] md:text-[8px] font-bold text-white/70 uppercase tracking-wider mb-0.5">Status</div>
                    <div className="text-[9px] md:text-[10px] font-semibold text-green-400">Available</div>
                  </div>
                </div>
                <a href="https://www.google.com/maps/place/Sri+Sai+Baba+ghee+Sweets+and+home+food/data=!4m2!3m1!1s0x3a35eff83caf1a51:0x4c5897db5ec9191b" target="_blank" rel="noopener noreferrer" className="w-[fit-content] md:w-auto px-3 py-1.5 md:px-4 md:py-2 bg-white text-black rounded-full font-bold text-[10px] md:text-xs hover:bg-gray-200 transition-all shadow-lg flex items-center justify-center gap-1.5 group/btn">
                  Locate <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Square Card: Moghalraj Puram */}
          <div className="md:col-span-1 md:row-span-1 bg-surface-lowest rounded-[16px] p-3 md:p-4 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(27,28,25,0.04)] hover:shadow-[0_32px_64px_-12px_rgba(27,28,25,0.08)] transition-all duration-500 group flex flex-col justify-between border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.290400305498!2d80.64531319999999!3d16.506510100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb163061d285%3A0x13742cd6c4080b29!2sSri%20sai%20baba%20ghee%20sweets%20and%20home%20foods!5e1!3m2!1sen!2sin!4v1774768387226!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full scale-[1.25] origin-center transition-all duration-700 pointer-events-none border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0"></div>
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[8px] md:text-[9px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/20 text-white backdrop-blur-md tracking-wide uppercase">
                Featured
              </span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="font-display text-sm md:text-base font-bold text-white mb-0.5 tracking-tight drop-shadow-md">Jammichettu Center</h3>
              <p className="text-white/80 text-[9px] md:text-[10px] mb-1.5 drop-shadow-md">Moghalraj Puram</p>
              <div className="flex flex-col gap-0.5 mb-2 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg w-[fit-content]">
                <span className="text-[7px] md:text-[8px] font-bold text-white/70 uppercase tracking-wider">Timings</span>
                <span className="text-[9px] md:text-[10px] font-semibold text-white">9:30 AM - 10:30 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white font-bold text-[10px] md:text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
                  <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 fill-yellow-400" /> 4.5/5
                </div>
                <a href="https://www.google.com/maps/place/Sri+sai+baba+ghee+sweets+and+home+foods/data=!4m2!3m1!1s0x3a35fb163061d285:0x13742cd6c4080b29" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white text-black rounded-full font-bold text-[9px] md:text-[10px] hover:bg-gray-200 transition-all shadow-md flex items-center gap-1 group/btn">
                  Locate <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Square Card: 100 Feet Road */}
          <div className="md:col-span-1 md:row-span-1 bg-surface-lowest rounded-[16px] p-3 md:p-4 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(27,28,25,0.04)] hover:shadow-[0_32px_64px_-12px_rgba(27,28,25,0.08)] transition-all duration-500 group flex flex-col justify-between border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.4660237704513!2d80.66530189999999!3d16.4950275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb0023e9a597%3A0x884964522976f9d4!2sSri%20Sai%20Baba%20Sweets%20%26%20Bakery!5e1!3m2!1sen!2sin!4v1774768428801!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full scale-[1.25] origin-center transition-all duration-700 pointer-events-none border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0"></div>
            <div className="relative z-10">
              <span className="text-[8px] md:text-[9px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/20 text-white backdrop-blur-md tracking-wide uppercase">
                Main Branch
              </span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="font-display text-sm md:text-base font-bold text-white mb-0.5 tracking-tight drop-shadow-md">100 Feet Road</h3>
              <p className="text-white/80 text-[9px] md:text-[10px] italic mb-1.5 drop-shadow-md">Auto Nagar</p>
              <div className="flex flex-col gap-0.5 mb-2 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg w-[fit-content]">
                <span className="text-[7px] md:text-[8px] font-bold text-white/70 uppercase tracking-wider">Timings</span>
                <span className="text-[9px] md:text-[10px] font-semibold text-white">8 AM - 10 PM</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-white font-bold text-[10px] md:text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
                  <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 fill-yellow-400" /> 4.4/5
                </div>
                <a href="https://www.google.com/maps/place/Sri+sai+baba+Ghee+sweets+and+home+foods/data=!4m2!3m1!1s0x3a35fad96c55b64f:0xc8892b7800bca8f8" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white text-black rounded-full font-bold text-[9px] md:text-[10px] hover:bg-gray-200 transition-all shadow-md flex items-center gap-1 group/btn">
                  Locate <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}


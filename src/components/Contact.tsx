import React, { useState } from 'react';
import { Terminal, Send, Copy, Check, ShieldCheck, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export const Contact: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Job / Internship Opportunity',
    message: '',
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playWarp();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      sound.playSuccess();
      setFormData({
        name: '',
        email: '',
        topic: 'Job / Internship Opportunity',
        message: '',
      });
      setTimeout(() => setTransmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B4D9FD] bg-[#171715] px-3 py-1 border border-[#2a2a26] rounded-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 05. CONTACT ME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF9F5] tracking-tight uppercase font-pixel-head">
          LET'S TALK
        </h2>
        <p className="text-[#EDECE8]/70 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
          Have an open role, a freelance project, or just want to say hi? Send me a message below and I'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="dev-card p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-[#FAF9F5] font-mono text-xs pb-3 border-b border-[#222220]">
              <Mail className="w-4 h-4 text-[#B4D9FD]" />
              <span>DIRECT CHANNELS</span>
            </div>

            <p className="text-sm text-[#EDECE8]/80 font-sans leading-relaxed">
              I'm actively looking for full-time software engineering roles and exciting freelance projects. Feel free to copy my email or connect on social platforms!
            </p>

            {/* Email quick copy panel */}
            <div className="p-3 bg-[#121211] border border-[#2a2a26] rounded-md flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#EDECE8]/40 uppercase">EMAIL:</div>
                <div className="text-xs sm:text-sm font-mono text-[#B4D9FD] font-semibold">
                  {profile.email}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 bg-[#171715] hover:bg-[#B4D9FD] hover:text-black text-[#EDECE8] border border-dashed border-[#EDECE8]/40 text-xs font-mono rounded transition-colors flex items-center gap-1.5"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#33FF7D]" /> : <Copy className="w-3.5 h-3.5 text-[#B4D9FD]" />}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Social channels (dashed buttons) */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(600, 0.03)}
                className="p-2.5 bg-[#121211] hover:bg-[#B4D9FD] hover:text-black border border-dashed border-[#EDECE8]/30 text-[#EDECE8] flex flex-col items-center gap-1 transition-all text-xs font-mono rounded"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(600, 0.03)}
                className="p-2.5 bg-[#121211] hover:bg-[#B4D9FD] hover:text-black border border-dashed border-[#EDECE8]/30 text-[#EDECE8] flex flex-col items-center gap-1 transition-all text-xs font-mono rounded"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>

              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(600, 0.03)}
                className="p-2.5 bg-[#121211] hover:bg-[#B4D9FD] hover:text-black border border-dashed border-[#EDECE8]/30 text-[#EDECE8] flex flex-col items-center gap-1 transition-all text-xs font-mono rounded"
              >
                <TwitterIcon className="w-4 h-4" />
                <span>X / TWITTER</span>
              </a>
            </div>

            {/* Response time */}
            <div className="pt-3 border-t border-[#222220] flex items-center justify-between text-[10px] font-mono text-[#EDECE8]/40">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#33FF7D]" />
                FAST REPLY GUARANTEE
              </span>
              <span>&lt; 24H RESPONSE TIME</span>
            </div>

          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="dev-card p-6 rounded-lg relative">
            
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#222220] text-xs font-mono">
              <span className="text-[#B4D9FD]">&gt; SEND_A_MESSAGE</span>
              <span className="text-[#33FF7D]">[INBOX OPEN]</span>
            </div>

            {transmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto bg-[#171715] border border-[#33FF7D] rounded flex items-center justify-center text-[#33FF7D] shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-mono text-[#33FF7D]">
                  MESSAGE SENT SUCCESSFULLY!
                </h4>
                <p className="text-xs text-[#EDECE8]/70 font-sans max-w-md mx-auto">
                  Thanks for reaching out! I've received your note and will get back to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#EDECE8]/50 block uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full bg-[#121211] border border-[#2a2a26] focus:border-[#B4D9FD] px-3 py-2 text-xs font-mono text-[#FAF9F5] focus:outline-none rounded placeholder:text-[#EDECE8]/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#EDECE8]/50 block uppercase">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[#121211] border border-[#2a2a26] focus:border-[#B4D9FD] px-3 py-2 text-xs font-mono text-[#FAF9F5] focus:outline-none rounded placeholder:text-[#EDECE8]/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#EDECE8]/50 block uppercase">
                    WHAT'S THIS ABOUT?
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#121211] border border-[#2a2a26] focus:border-[#B4D9FD] px-3 py-2 text-xs font-mono text-[#FAF9F5] focus:outline-none rounded"
                  >
                    <option value="Job / Internship Opportunity">Full-Time Job or Internship</option>
                    <option value="Freelance Web Project">Freelance Web or App Project</option>
                    <option value="AI Integration & Consultation">AI Integration or Chatbot</option>
                    <option value="Open Source Collaboration">Open Source or Tech Chat</option>
                    <option value="Just Saying Hello">Just Saying Hello 👋</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#EDECE8]/50 block uppercase">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about what you're working on, what you need, or what role you're hiring for..."
                    className="w-full bg-[#121211] border border-[#2a2a26] focus:border-[#B4D9FD] p-3 text-xs font-sans text-[#FAF9F5] focus:outline-none rounded placeholder:text-[#EDECE8]/30 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3 bg-[#B4D9FD] hover:bg-[#9ecbff] text-black font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-md transition-all shadow-sm disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-bounce' : ''}`} />
                  <span>{isTransmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>

    </section>
  );
};

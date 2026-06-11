import { motion } from 'framer-motion';
import { useState } from 'react';
import { personalInfo } from '../../data/content';
import { ExternalLink, Copy, Check, Mail, Linkedin, Github, FileText, Terminal as TerminalIcon } from 'lucide-react';

const contactLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: personalInfo.linkedin,
    icon: Linkedin,
    color: '#0077B5',
    command: 'connect --platform linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: personalInfo.github,
    icon: Github,
    color: '#339933',
    command: 'clone --repo github',
  },
  {
    id: 'email',
    label: 'Email',
    url: `mailto:${personalInfo.email}`,
    icon: Mail,
    color: '#00d4ff',
    command: 'send --message email',
  },
  {
    id: 'resume',
    label: 'Resume',
    url: personalInfo.resume,
    icon: FileText,
    color: '#fbbf24',
    command: 'download --file resume.pdf',
  },
];

export function ContactTerminal() {
  const [copied, setCopied] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> System initialized',
    '> Establishing connection...',
    '> Ready for contact',
  ]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCommand = (link: typeof contactLinks[0]) => {
    setTerminalLines((prev) => [
      ...prev,
      `$ ${link.command}`,
      '> Initiating connection...',
      `> Redirecting to ${link.label}...`,
    ]);

    const win = window.open(link.url, '_blank');
    if (win) {
      win.focus();
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-space-mono text-cyber-blue text-sm mb-2">CHAPTER 07</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Terminal
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Establish a connection. Choose your preferred method of outreach.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Terminal Window */}
          <motion.div
            className="glass-panel-strong rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-black/50 border-b border-white/10">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="font-space-mono text-xs text-gray-400 ml-2">
                contact@bhavya-os ~ %
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-4 font-space-mono text-sm h-80 overflow-y-auto">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className={`mb-1 ${
                    line.startsWith('$') ? 'text-cyber-green' : 'text-gray-400'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              <motion.div
                className="flex items-center text-cyber-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="mr-1">$</span>
                <div className="typing-cursor" />
              </motion.div>
            </div>

            {/* Quick Commands */}
            <div className="p-4 border-t border-white/10">
              <p className="font-space-mono text-xs text-gray-500 mb-2">Quick Commands:</p>
              <div className="flex flex-wrap gap-2">
                {contactLinks.slice(0, 3).map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleCommand(link)}
                    className="px-3 py-1 glass-panel rounded text-xs font-space-mono text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-hoverable
                  >
                    {link.command.split(' ')[0]}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {contactLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="glass-panel rounded-xl p-4 flex items-center justify-between group"
                  whileHover={{ x: 10 }}
                  style={{ borderColor: `${link.color}20` }}
                  data-hoverable
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${link.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <link.icon className="w-6 h-6" style={{ color: link.color }} />
                    </motion.div>
                    <div>
                      <h3 className="font-rajdhani text-lg font-semibold text-white group-hover:text-cyber-blue transition-colors">
                        {link.label}
                      </h3>
                      <p className="font-space-mono text-xs text-gray-400">
                        {link.id === 'email' ? personalInfo.email : link.command}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {link.id === 'email' && (
                      <motion.button
                        onClick={() => handleCopy(personalInfo.email, link.id)}
                        className="p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        data-hoverable
                      >
                        {copied === link.id ? (
                          <Check className="w-4 h-4 text-cyber-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </motion.button>
                    )}
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      data-hoverable
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Location */}
            <motion.div
              className="glass-panel rounded-xl p-4 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-cyber-purple/20 flex items-center justify-center">
                <TerminalIcon className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="font-rajdhani text-gray-400">Location</p>
                <p className="font-space-mono text-white">{personalInfo.location}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        className="relative z-10 text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <TerminalIcon className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
            Ready to Connect?
          </h3>
          <p className="font-rajdhani text-gray-400 mb-6">
            Let's build something amazing together. Open for opportunities and collaborations.
          </p>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-xl font-rajdhani text-lg font-semibold text-cyber-dark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hoverable
          >
            <Mail className="w-5 h-5" />
            Send Message
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

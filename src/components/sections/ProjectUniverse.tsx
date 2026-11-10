import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../../data/content';
import { useAppStore, type Project } from '../../store/useAppStore';
import { ExternalLink, Github, X, ChevronRight, Cpu, Target, Lightbulb, TrendingUp } from 'lucide-react';

function ProjectModal() {
  const { projectModalOpen, setProjectModalOpen, selectedProject } = useAppStore();

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {projectModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-cyber-dark/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProjectModalOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="glass-panel-strong rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="relative p-8 border-b border-white/10">
                {/* Close button */}
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="absolute top-4 right-4 p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                  data-hoverable
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Project Color Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${selectedProject.color}88, transparent)` }}
                />

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${selectedProject.color}20` }}
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ background: selectedProject.color }}
                    />
                  </motion.div>

                  <div>
                    <h2 className="font-orbitron text-3xl font-bold text-white mb-2">
                      {selectedProject.name}
                    </h2>
                    <p className="font-rajdhani text-gray-400 text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-6">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                      data-hoverable
                    >
                      <Github className="w-4 h-4" />
                      <span className="font-rajdhani text-sm">Source Code</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-cyber-blue/20 text-cyber-blue rounded-lg hover:bg-cyber-blue/30 transition-colors"
                      data-hoverable
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-rajdhani text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Long Description */}
                <div>
                  <p className="font-rajdhani text-gray-300 text-lg leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyber-blue" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass-panel rounded-full font-space-mono text-sm text-gray-300"
                        style={{ borderColor: `${selectedProject.color}30` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyber-green" />
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 glass-panel rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ChevronRight className="w-4 h-4 text-cyber-green mt-1 shrink-0" />
                        <span className="font-rajdhani text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-cyber-yellow" />
                    Challenges Overcome
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.challenges.map((challenge, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 glass-panel rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyber-yellow/20 shrink-0">
                          <span className="font-orbitron text-xs text-cyber-yellow">{i + 1}</span>
                        </div>
                        <span className="font-rajdhani text-gray-300 text-sm">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyber-purple" />
                    Results & Impact
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProject.results.map((result, i) => (
                      <motion.div
                        key={i}
                        className="p-4 glass-panel rounded-xl text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        style={{ borderColor: `${selectedProject.color}30` }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg mx-auto mb-2"
                          style={{ backgroundColor: selectedProject.color }}
                        />
                        <span className="font-rajdhani text-gray-300 text-sm">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { setSelectedProject, setProjectModalOpen } = useAppStore();

  const handleClick = () => {
    setSelectedProject(project as Project);
    setProjectModalOpen(true);
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Planet Container */}
      <motion.div
        className="relative aspect-square max-w-xs mx-auto cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        data-hoverable
      >
        {/* Orbit Ring */}
        <div className="absolute inset-0 scale-[1.5]">
          <div
            className="absolute inset-0 rounded-full border border-dashed opacity-20"
            style={{ borderColor: project.color }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: `${project.color}40` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Planet */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${project.color}60, ${project.color}20, #0a0a0f)`,
              boxShadow: `0 0 60px ${project.color}40, inset 0 0 60px ${project.color}20`,
            }}
          >
            {/* Surface texture */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${20 + Math.random() * 30}%`,
                    height: `${20 + Math.random() * 30}%`,
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    backgroundColor: `${project.color}`,
                    opacity: 0.3,
                  }}
                />
              ))}
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle, ${project.color}40 0%, transparent 70%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Planet Name */}
        <motion.div
          className="absolute -bottom-4 left-0 right-0 text-center"
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
        >
          <h3
            className="font-orbitron text-lg font-bold"
            style={{ color: project.color }}
          >
            {project.name}
          </h3>
          <p className="font-rajdhani text-gray-400 text-sm mt-1">
            {project.description}
          </p>
        </motion.div>

        {/* Satellite */}
        <motion.div
          className="absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: project.color }}
          animate={{
            x: [
              Math.cos(index * 1.5) * 120,
              Math.cos(index * 1.5 + Math.PI) * 120,
              Math.cos(index * 1.5) * 120,
            ],
            y: [
              Math.sin(index * 1.5) * 120,
              Math.sin(index * 1.5 + Math.PI) * 120,
              Math.sin(index * 1.5) * 120,
            ],
          }}
          transition={{ duration: 8 + index, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectUniverse() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        {/* Star field effect */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-space-mono text-cyber-purple text-sm mb-2">CHAPTER 03</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Project Universe
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the galaxies of projects I've built. Each planet represents a unique journey of creation and innovation.
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="relative z-10 text-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-rajdhani text-gray-400">
          Click on any planet to explore the project in detail
        </p>
      </motion.div>

      <ProjectModal />
    </section>
  );
}

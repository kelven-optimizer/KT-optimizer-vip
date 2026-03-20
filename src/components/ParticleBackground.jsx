import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Resize handler
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Mouse interaction
    let mouse = { x: null, y: null }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    // Particles logic
    const particles = []
    // Responsive count to prevent lag on mobile, glorious on desktop
    const particleCount = window.innerWidth > 768 ? 130 : 60 
    
    // Brand Colors: Purple 600, Purple 400, Fuchsia 500
    const colors = ['#9333ea', '#c084fc', '#d946ef', '#a855f7']

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1.5 - 0.75
        this.speedY = Math.random() * 1.5 - 0.75
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }
      update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
        
        this.x += this.speedX
        this.y += this.speedY
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        
        // Premium Glow effect
        ctx.shadowBlur = 12
        ctx.shadowColor = this.color
        
        ctx.fill()
        ctx.shadowBlur = 0 // Reset so lines don't globally glow overwhelmingly
      }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
    }

    function connect() {
      let opacityValue = 1
      const maxNodeDist = 16000 // roughly 126px distance
      const maxMouseDist = 30000 // roughly 173px distance for mouse

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                       + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y))
          
          if (distance < maxNodeDist) {
            opacityValue = 1 - (distance / maxNodeDist)
            // Soft purple connecting line
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue * 0.25})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
        
        // Mouse connection line (stronger fuchsia/magenta glow)
        if (mouse.x !== null && mouse.y !== null) {
          let distanceMouse = ((particles[a].x - mouse.x) * (particles[a].x - mouse.x))
                            + ((particles[a].y - mouse.y) * (particles[a].y - mouse.y))
          if (distanceMouse < maxMouseDist) {
            opacityValue = 1 - (distanceMouse / maxMouseDist)
            ctx.strokeStyle = `rgba(217, 70, 239, ${opacityValue * 0.7})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      // Changed to fixed full-screen. Kept pointer-events-none so we don't block UI clicks!
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

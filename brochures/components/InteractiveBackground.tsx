
import React, { useEffect, useRef, useState } from 'react';

// Use p5 from global window as it is loaded via CDN in index.html
declare const p5: any;

export interface InteractiveBackgroundProps {
  imageUrl?: string;
  hue?: number;
  saturation?: number;
  threshold?: number;
  minStroke?: number;
  maxStroke?: number;
  spacing?: number;
  noiseScale?: number;
  density?: number;
  invertImage?: boolean;
  invertWireframe?: boolean;
  magnifierEnabled?: boolean;
  magnifierRadius?: number;
  forceStrength?: number;
  friction?: number;
  restoreSpeed?: number;
  className?: string;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop", // Technical abstract image
  hue = 120, // JB³Ai Green
  saturation = 100,
  threshold = 255,
  minStroke = 2,
  maxStroke = 5,
  spacing = 10,
  noiseScale = 0,
  density = 2.0,
  invertImage = true,
  invertWireframe = true,
  magnifierEnabled = true,
  magnifierRadius = 180,
  forceStrength = 12,
  friction = 0.9,
  restoreSpeed = 0.05,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const propsRef = useRef({
    hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale, 
    density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
    forceStrength, friction, restoreSpeed
  });

  useEffect(() => {
    propsRef.current = {
      hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale,
      density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
      forceStrength, friction, restoreSpeed
    };
  }, [hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale, density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius, forceStrength, friction, restoreSpeed]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }

    const sketch = (p: any) => {
      let originalImg: any;
      let img: any;
      let palette: any[] = [];
      let points: any[] = [];
      
      let lastHue = -1;
      let lastSaturation = -1;
      let lastSpacing = -1;
      let lastNoiseScale = -1;
      let lastDensity = -1;
      let lastInvertImage: boolean | null = null;
      let magnifierX = 0;
      let magnifierY = 0;
      let magnifierInertia = 0.1;

      p.preload = () => {
        p.loadImage(
          imageUrl,
          (loadedImg: any) => {
            originalImg = loadedImg;
            setIsLoading(false);
          },
          (err: any) => {
            console.error("Failed to load background image", err);
            setIsLoading(false);
          }
        );
      };

      p.setup = () => {
        if (!originalImg) return;
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current);
        magnifierX = p.width / 2;
        magnifierY = p.height / 2;
        processImage();
        generatePalette(propsRef.current.hue, propsRef.current.saturation);
        generatePoints();
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        processImage();
        generatePoints();
      };

      function processImage() {
        if (!originalImg) return;
        img = originalImg.get();
        if (p.width > 0 && p.height > 0) {
          img.resize(p.width, p.height);
        }
        img.filter(p.GRAY);

        if (propsRef.current.invertImage) {
          img.loadPixels();
          for (let i = 0; i < img.pixels.length; i += 4) {
            img.pixels[i] = 255 - img.pixels[i];
            img.pixels[i + 1] = 255 - img.pixels[i + 1];
            img.pixels[i + 2] = 255 - img.pixels[i + 2];
          }
          img.updatePixels();
        }
        lastInvertImage = propsRef.current.invertImage;
      }

      function generatePalette(h: number, s: number) {
        palette = [];
        p.push();
        p.colorMode(p.HSL);
        for (let i = 0; i < 12; i++) {
          let lightness = p.map(i, 0, 11, 80, 20); // Slightly more vivid for brand colors
          palette.push(p.color(h, s, lightness));
        }
        p.pop();
      }

      function generatePoints() {
        if (!img) return;
        points = [];
        const { spacing, density, noiseScale } = propsRef.current;
        const safeSpacing = Math.max(2, spacing); 

        for (let y = 0; y < img.height; y += safeSpacing) {
          for (let x = 0; x < img.width; x += safeSpacing) {
            if (p.random() > density) continue;
            
            let nx = p.noise(x * noiseScale, y * noiseScale) - 0.5;
            let ny = p.noise((x + 500) * noiseScale, (y + 500) * noiseScale) - 0.5;
            let px = x + nx * safeSpacing;
            let py = y + ny * safeSpacing;
            
            points.push({
              pos: p.createVector(px, py),
              originalPos: p.createVector(px, py),
              vel: p.createVector(0, 0)
            });
          }
        }
        
        lastSpacing = spacing;
        lastNoiseScale = noiseScale;
        lastDensity = density;
      }

      function applyForceField(mx: number, my: number) {
        const props = propsRef.current;
        if (!props.magnifierEnabled) return;

        for (let pt of points) {
          let dir = p.createVector(pt.pos.x - mx, pt.pos.y - my);
          let d = dir.mag();
          
          if (d < props.magnifierRadius) {
            dir.normalize();
            let force = dir.mult(props.forceStrength / Math.max(1, d));
            pt.vel.add(force);
          }
          
          pt.vel.mult(props.friction);
          let restore = p.createVector(pt.pos.x - pt.originalPos.x, pt.pos.y - pt.originalPos.y).mult(-props.restoreSpeed);
          pt.vel.add(restore);
          pt.pos.add(pt.vel);
        }
      }

      p.draw = () => {
        if (!img) return;
        p.clear();

        const props = propsRef.current;

        if (props.hue !== lastHue || props.saturation !== lastSaturation) {
          generatePalette(props.hue, props.saturation);
          lastHue = props.hue;
          lastSaturation = props.saturation;
        }

        if (props.invertImage !== lastInvertImage) {
          processImage();
        }

        if (props.spacing !== lastSpacing || props.noiseScale !== lastNoiseScale || props.density !== lastDensity) {
          generatePoints();
        }

        magnifierX = p.lerp(magnifierX, p.mouseX, magnifierInertia);
        magnifierY = p.lerp(magnifierY, p.mouseY, magnifierInertia);

        applyForceField(magnifierX, magnifierY);

        img.loadPixels();
        p.noFill();

        for (let pt of points) {
          let x = pt.pos.x;
          let y = pt.pos.y;
          let d = p.dist(x, y, magnifierX, magnifierY);
          
          let px = p.constrain(p.floor(x), 0, img.width - 1);
          let py = p.constrain(p.floor(y), 0, img.height - 1);
          
          let index = (px + py * img.width) * 4;
          let brightness = img.pixels[index]; 
          
          if (brightness === undefined) continue;

          let condition = props.invertWireframe
            ? brightness < props.threshold
            : brightness > props.threshold;

          if (condition) {
            let shadeIndex = Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1));
            shadeIndex = p.constrain(shadeIndex, 0, palette.length - 1);
            
            let strokeSize = p.map(brightness, 0, 255, props.minStroke, props.maxStroke);
            
            if (props.magnifierEnabled && d < props.magnifierRadius) {
              let factor = p.map(d, 0, props.magnifierRadius, 2, 1);
              strokeSize *= factor;
            }
            
            if (palette[shadeIndex]) {
              p.stroke(palette[shadeIndex]);
              p.strokeWeight(strokeSize);
              p.point(x, y);
            }
          }
        }
      };
    };

    const myP5 = new p5(sketch);
    p5InstanceRef.current = myP5;

    return () => {
      myP5.remove();
    };
  }, [imageUrl]);

  return (
    <div 
      className={`fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden ${className}`} 
      ref={containerRef}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-[#66FF66]/20 text-[10px] tracking-widest uppercase font-bold">
          Initializing Intelligence Grid...
        </div>
      )}
    </div>
  );
}

export default InteractiveBackground;

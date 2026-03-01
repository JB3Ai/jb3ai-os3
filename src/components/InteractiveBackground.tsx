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
    imageUrl = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    hue = 120,
    saturation = 100,
    threshold = 0, // Threshold irrelevant if we don't mask by it
    minStroke = 1,
    maxStroke = 2,
    spacing = 8,
    noiseScale = 0.005,
    density = 0.7,
    invertImage = true,
    invertWireframe = true,
    magnifierEnabled = true,
    magnifierRadius = 400,
    forceStrength = 80,
    friction = 0.85,
    restoreSpeed = 0.06,
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const mouseRef = useRef({ x: -1000, y: -1000 });

    const propsRef = useRef({
        hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale,
        density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
        forceStrength, friction, restoreSpeed
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
            let lastInvertImage: boolean | null = null;
            let magnifierX = -1000;
            let magnifierY = -1000;
            let magnifierInertia = 0.15;

            p.preload = () => {
                p.loadImage(
                    imageUrl,
                    (loadedImg: any) => {
                        originalImg = loadedImg;
                        setIsLoading(false);
                    },
                    (err: any) => {
                        console.error("Failed to load background", err);
                        setIsLoading(false);
                    }
                );
            };

            p.setup = () => {
                // Fixed full-screen canvas
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent(containerRef.current);
                // Ensure canvas styles are set for fixed background
                canvas.style('position', 'fixed');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('width', '100%');
                canvas.style('height', '100%');
                canvas.style('z-index', '-1');
                canvas.style('pointer-events', 'none'); // PASS THROUGH CLICKS

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
                for (let i = 0; i < 8; i++) {
                    let lightness = p.map(i, 0, 7, 90, 50);
                    palette.push(p.color(h, s, lightness));
                }
                p.pop();
            }

            function generatePoints() {
                if (!img) return; // Wait for image info? Actually used for width/height
                points = [];
                // step controls density (6-8 ideal as per user request)
                const { spacing, density } = propsRef.current;
                const step = Math.max(4, spacing);

                const cols = Math.floor(p.width / step); // Use floor as requested for strict grid
                const rows = Math.floor(p.height / step);

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        // deterministic “keep” mask, no randomness
                        // Use Math.abs to handle JS bitwise sign issues
                        const h = (c * 73856093) ^ (r * 19349663);
                        const keep = (Math.abs(h) % 1000) < (density * 1000);
                        if (!keep) continue;

                        const px = c * step;
                        const py = r * step;

                        points.push({
                            x: px,
                            y: py,
                            ox: px,
                            oy: py
                        });
                    }
                }
                lastSpacing = spacing;
            }

            function updatePositions(mx: number, my: number) {
                const props = propsRef.current;

                if (!props.magnifierEnabled) {
                    for (let pt of points) {
                        pt.x = pt.ox;
                        pt.y = pt.oy;
                    }
                    return;
                }

                const influenceRadius = props.magnifierRadius;
                const strength = props.forceStrength;

                for (let pt of points) {
                    // Vector from Mouse to Point (Repulsion)
                    let dx = pt.ox - mx;
                    let dy = pt.oy - my;

                    if (Math.abs(dx) > influenceRadius || Math.abs(dy) > influenceRadius) {
                        pt.x = pt.ox;
                        pt.y = pt.oy;
                        continue;
                    }

                    let distSq = dx * dx + dy * dy;
                    let rSq = influenceRadius * influenceRadius;

                    if (distSq < rSq) {
                        let dist = Math.sqrt(distSq);
                        // Force is stronger closer to center (0 to 1)
                        // Easing: quadratic falloff
                        let force = (1 - dist / influenceRadius);
                        force = force * force;

                        let displacement = force * strength;

                        // Normalized direction * displacement
                        // Avoid divide by zero
                        let dirX = dx / (dist || 1);
                        let dirY = dy / (dist || 1);

                        pt.x = pt.ox + dirX * displacement;
                        pt.y = pt.oy + dirY * displacement;
                    } else {
                        pt.x = pt.ox;
                        pt.y = pt.oy;
                    }
                }
            }

            p.draw = () => {
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

                if (props.spacing !== lastSpacing) {
                    generatePoints();
                }

                // Read directly from React ref for latest window coordinates
                const targetX = mouseRef.current.x;
                const targetY = mouseRef.current.y;

                magnifierX = p.lerp(magnifierX, targetX, magnifierInertia);
                magnifierY = p.lerp(magnifierY, targetY, magnifierInertia);

                updatePositions(magnifierX, magnifierY);

                if (img) img.loadPixels();
                p.noStroke();

                // Crisp squares only
                const size = props.maxStroke || 2;

                for (let pt of points) {
                    let x = pt.x;
                    let y = pt.y;

                    // Optional: Modulate color by image brightness if desired, 
                    // but DO NOT mask/drop points based on it.
                    let brightness = 255;
                    if (img && img.pixels) {
                        let px = Math.floor(pt.ox);
                        let py = Math.floor(pt.oy);
                        if (px >= 0 && px < img.width && py >= 0 && py < img.height) {
                            let index = (px + py * img.width) * 4;
                            brightness = img.pixels[index];
                        }
                    }

                    // Map brightness to palette index
                    let shadeIndex = 0;
                    if (brightness !== undefined) {
                        shadeIndex = Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1));
                        shadeIndex = p.constrain(shadeIndex, 0, palette.length - 1);
                    }

                    if (palette[shadeIndex]) {
                        p.fill(palette[shadeIndex]);
                        p.rect(x, y, size, size);
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
            className={`fixed inset-0 -z-10 opacity-80 pointer-events-none overflow-hidden ${className}`}
            ref={containerRef}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-[#66FF66]/20 text-[10px] tracking-widest uppercase font-bold animate-pulse">
                    Calibrating Neural Map...
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { generateImage } from '../../services/gemini';
import { Button } from '../ui/Button';
import { Image as ImageIcon, Download, RefreshCw } from 'lucide-react';

export const KineticCanvas: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        try {
            const result = await generateImage(prompt);
            // Parse response for image data
            const newImages: string[] = [];
            if (result.candidates?.[0]?.content?.parts) {
                for (const part of result.candidates[0].content.parts) {
                    if (part.inlineData && part.inlineData.data) {
                        const mime = part.inlineData.mimeType || 'image/png';
                        newImages.push(`data:${mime};base64,${part.inlineData.data}`);
                    }
                }
            }
            setImages(newImages);
        } catch (e) {
            console.error(e);
            alert("Failed to generate image.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col p-6 gap-6">
             <div>
                <h2 className="text-xl font-os text-yellow-400 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Kinetic Canvas
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Static Asset Generation</p>
            </div>

            <div className="flex gap-4">
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter visual description..."
                    className="flex-1 bg-black/40 border border-gray-700 rounded px-4 text-sm focus:border-yellow-500 outline-none text-white font-tech"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Button onClick={handleGenerate} isLoading={isLoading} className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                    GENERATE
                </Button>
            </div>

            <div className="flex-1 bg-black/20 rounded-lg border border-gray-800 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                {images.length === 0 && !isLoading && (
                    <div className="col-span-full flex flex-col items-center justify-center text-gray-600 opacity-50 h-64">
                         <ImageIcon className="w-12 h-12 mb-2" />
                         <p>Canvas Empty</p>
                    </div>
                )}
                {isLoading && (
                    <div className="col-span-full flex items-center justify-center h-64">
                        <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin" />
                    </div>
                )}
                {images.map((src, i) => (
                    <div key={i} className="relative group aspect-square bg-black rounded-lg overflow-hidden border border-gray-700">
                        <img src={src} alt="Generated" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <a href={src} download={`kinetic_art_${Date.now()}.png`} className="p-2 bg-white/10 hover:bg-yellow-500 rounded-full text-white transition-colors">
                                <Download className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Header from "@/components/Header";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import token from "../assets/token.png";
import { usePokemon } from "@/context/usePokemon";
import backgroundImage from "../assets/background-home.png";

interface RouletteOption {
  id: number;
  name: string;
  chance: number;
  color: string;
  image: string;
  reward: number;
  typeReward: string;
}

const options: RouletteOption[] = [
  {
    id: 0,
    name: "1 Ficha",
    chance: 30,
    color: "#14DBB9",
    image: token,
    reward: 1,
    typeReward: "token",
  },
  {
    id: 1,
    name: "3 Fichas",
    chance: 20,
    color: "#B1DB04",
    image: token,
    reward: 3,
    typeReward: "token",
  },
  {
    id: 2,
    name: "1 Energia",
    chance: 15,
    color: "#DBD706",
    image: energy,
    reward: 1,
    typeReward: "energy",
  },
  {
    id: 3,
    name: "3 Energias",
    chance: 12,
    color: "#DBAA07",
    image: energy,
    reward: 3,
    typeReward: "energy",
  },
  {
    id: 4,
    name: "1 Pokébola",
    chance: 10,
    color: "#DB7527",
    image: pokebola,
    reward: 1,
    typeReward: "pokeball",
  },
  {
    id: 5,
    name: "10 Energias",
    chance: 8,
    color: "#DB2C16",
    image: energy,
    reward: 10,
    typeReward: "energy",
  },
  {
    id: 6,
    name: "3 Pokébolas",
    chance: 4,
    color: "#DB0A9A",
    image: pokebola,
    reward: 3,
    typeReward: "pokeball",
  },
  {
    id: 7,
    name: "1 Diamante",
    chance: 1,
    color: "#8500DB",
    image: diamond,
    reward: 1,
    typeReward: "diamond",
  },
];

// Função para carregar imagens
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const Roulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RouletteOption | null>(null);
  const [rotation, setRotation] = useState(0);
  // const [totalSpins, setTotalSpins] = useState(0);
  // const [statistics, setStatistics] = useState<{ [key: string]: number }>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { gainPokeball, gainEnergy, gainToken, gainDiamond, useToken, state } =
    usePokemon();
  const [isAvailable, setIsAvailable] = useState(
    state.userStatus.token < 5 ? false : true,
  );

  // Carrega todas as imagens
  useEffect(() => {
    const loadAllImages = async () => {
      const imageMap: { [key: string]: HTMLImageElement } = {};
      const uniqueImages = [...new Set(options.map((opt) => opt.image))];

      for (const src of uniqueImages) {
        try {
          const img = await loadImage(src);
          imageMap[src] = img;
        } catch (error) {
          console.error(`Erro ao carregar imagem: ${src}`, error);
        }
      }
      setImages(imageMap);
      setImagesLoaded(true);
    };

    loadAllImages();
  }, []);

  const drawRoulette = (initialAngle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalOptions = options.length;
    const anglePerOption = (2 * Math.PI) / totalOptions;

    options.forEach((option, index) => {
      const startAngle = initialAngle + index * anglePerOption;
      const endAngle = startAngle + anglePerOption;

      // Desenha o segmento
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = option.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Desenha a imagem no centro do segmento
      const image = images[option.image];
      if (image && imagesLoaded) {
        const textAngle = startAngle + anglePerOption / 2;
        const imageRadius = radius * 0.55;
        const x = centerX + Math.cos(textAngle) * imageRadius;
        const y = centerY + Math.sin(textAngle) * imageRadius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(textAngle + (textAngle > Math.PI / 2 ? Math.PI : 0));

        // Tamanho da imagem
        const imageSize = 35;
        ctx.drawImage(
          image,
          -imageSize / 2,
          -imageSize / 2,
          imageSize,
          imageSize,
        );

        ctx.restore();
      }

      // Opcional: Adiciona a quantidade abaixo da imagem
      const textAngle = startAngle + anglePerOption / 2;
      const textRadius = radius * 0.8;
      const x = centerX + Math.cos(textAngle) * textRadius;
      const y = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(textAngle + (textAngle > Math.PI / 2 ? Math.PI : 0));

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 4;

      // Mostra apenas o número da quantidade
      const quantity = option.name.split(" ")[0];
      ctx.fillText(quantity, 0, 0);

      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#2C3E50";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pointer indicator at top (12 o'clock position)
    ctx.beginPath();
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX - 15, 0);
    ctx.lineTo(centerX + 15, 0);
    ctx.closePath();
    ctx.fillStyle = "#E74C3C";
    ctx.fill();
  };

  const spin = () => {
    if (isSpinning) return;

    if (state.userStatus.token < 5) {
      setIsAvailable(false);
      return;
    } else {
      useToken(5);
      setIsAvailable(true);
    }

    setIsSpinning(true);
    setResult(null);

    const selectedOption = getRandomOption();
    const totalOptions = options.length;
    const anglePerOption = (2 * Math.PI) / totalOptions;

    const pointerAngle = -Math.PI / 2;
    const selectedIndex = selectedOption.id;

    let targetAngle =
      pointerAngle - selectedIndex * anglePerOption - anglePerOption / 2;
    targetAngle = ((targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const totalRotation = extraSpins * 2 * Math.PI + targetAngle;

    const duration = 5000;
    const startTime = performance.now();
    const initialRotation = rotation;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentRotation = initialRotation + totalRotation * easeOut;
      setRotation(currentRotation);

      drawRoulette(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        const finalOption = getOptionAtPointer(currentRotation);
        setIsSpinning(false);
        setResult(finalOption);
        if (finalOption.typeReward === "energy") {
          gainEnergy(finalOption.reward);
        } else if (finalOption.typeReward === "token") {
          gainToken(finalOption.reward);
        } else if (finalOption.typeReward === "pokeball") {
          gainPokeball(finalOption.reward);
        } else {
          gainDiamond(finalOption.reward);
        }

        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const getOptionAtPointer = (currentAngle: number): RouletteOption => {
    const totalOptions = options.length;
    const anglePerOption = (2 * Math.PI) / totalOptions;
    const pointerAngle = -Math.PI / 2;

    let relativeAngle = (pointerAngle - currentAngle) % (2 * Math.PI);
    if (relativeAngle < 0) relativeAngle += 2 * Math.PI;

    const index = Math.floor(relativeAngle / anglePerOption);
    return options[index % options.length];
  };

  const getRandomOption = (): RouletteOption => {
    const random = Math.random() * 100;
    let accumulated = 0;

    for (const option of options) {
      accumulated += option.chance;
      if (random <= accumulated) {
        return option;
      }
    }
    return options[options.length - 1];
  };

  // Redesenha quando as imagens são carregadas
  useEffect(() => {
    if (imagesLoaded) {
      drawRoulette(rotation);
    }
  }, [imagesLoaded]);

  // Redesenha quando a rotação muda (apenas para atualizar a animação)
  useEffect(() => {
    if (imagesLoaded) {
      drawRoulette(rotation);
    }
  }, [rotation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-20 z-0"
      />
      <main className="flex flex-col items-center h-screen pt-30 px-4 ">
        <div className="border-white/30 border rounded-2xl shadow-2xl p-8 max-w-2xl w-full z-10">
          <h2 className="text-white text-3xl font-bold text-center mb-4">
            Roleta de Prêmios
          </h2>

          <div className="relative flex justify-center mb-8">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="max-w-full h-auto rounded-full shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center text-white font-semibold">
              <span>Custo: -5</span>
              <img src={token} alt="token" className="w-8" />
            </div>
            <button
              onClick={spin}
              disabled={isSpinning || !imagesLoaded || !isAvailable}
              className={`
              px-8 py-3 rounded-lg font-bold text-white text-lg transition-all cursor-pointer
              ${
                isSpinning || !imagesLoaded || !isAvailable
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-bt-purple hover:to-purple-700 hover:scale-105 active:scale-95"
              }
              shadow-lg transform
            `}
            >
              {!imagesLoaded
                ? "Carregando..."
                : isSpinning
                  ? "🔄 Girando..."
                  : isAvailable
                    ? "Girar"
                    : "Não tem fichas suficientes"}
            </button>

            {result && (
              <div className="flex flex-col items-center gap-2 mt-4 p-4 bg-green-100 rounded-lg border-2 border-green-500 animate-bounce">
                <div className="flex gap-2 items-center">
                  <span className="font-bold">{result.name.slice(0, 1)} x</span>
                  <img src={result.image} alt={result.name} className="w-6" />
                </div>
                <p className="text-xl font-bold text-green-700 text-center">
                  🎉 Parabéns! Você ganhou: {result.name}!
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-white">
            {options.map((option) => (
              <div
                key={option.id}
                className="text-xs p-1 rounded text-center flex flex-col items-center gap-1"
                style={{ backgroundColor: option.color + "90" }}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-6 h-6 object-contain"
                />
                <span className="font-semibold">{option.name}</span>
                <span>{option.chance}%</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Roulette;
